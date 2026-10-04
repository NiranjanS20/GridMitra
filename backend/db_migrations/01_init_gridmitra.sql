-- D2. Schema Organization
CREATE SCHEMA IF NOT EXISTS iam;
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS grid;
CREATE SCHEMA IF NOT EXISTS ts;
CREATE SCHEMA IF NOT EXISTS ml;
CREATE SCHEMA IF NOT EXISTS ctrl;
CREATE SCHEMA IF NOT EXISTS fair;
CREATE SCHEMA IF NOT EXISTS dr;
CREATE SCHEMA IF NOT EXISTS fin;
CREATE SCHEMA IF NOT EXISTS gov;
CREATE SCHEMA IF NOT EXISTS sim;
CREATE SCHEMA IF NOT EXISTS ops;
CREATE SCHEMA IF NOT EXISTS audit;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- ==========================================
-- IAM (Identity & Access Management)
-- ==========================================
CREATE TABLE iam.user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID NOT NULL, -- Links to Supabase auth.users
    kind TEXT CHECK (kind IN ('resident', 'staff')),
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE iam.user_contact (
    user_id UUID PRIMARY KEY REFERENCES iam.user(id),
    phone_enc BYTEA,
    email_enc BYTEA
);

CREATE TABLE iam.role_assignment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES iam.user(id),
    role TEXT NOT NULL,
    scope_type TEXT CHECK (scope_type IN ('site', 'feeder', 'tenant', 'global')),
    scope_id UUID,
    granted_by UUID REFERENCES iam.user(id),
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_to TIMESTAMPTZ
);

-- ==========================================
-- CORE (Physical Assets & Hierarchy)
-- ==========================================
CREATE TABLE core.tenant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE core.site (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES core.tenant(id),
    feeder_id UUID,
    transformer_id UUID,
    capacity_kva REAL,
    timezone TEXT DEFAULT 'Asia/Kolkata',
    observability_level TEXT
);

CREATE TABLE core.household (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES core.site(id),
    type TEXT CHECK (type IN ('home', 'shop')),
    members INT,
    pseudonym_id TEXT UNIQUE
);

CREATE TABLE core.device (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES core.site(id),
    kind TEXT NOT NULL,
    adapter TEXT,
    status TEXT DEFAULT 'online',
    last_seen TIMESTAMPTZ
);

-- ==========================================
-- TS (Time-Series Telemetry)
-- ==========================================
CREATE TABLE ts.metric_catalog (
    metric_id SMALLINT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL, 
    unit TEXT NOT NULL,
    min_valid REAL, 
    max_valid REAL
);

-- Partitioned Telemetry Table
CREATE TABLE ts.telemetry (
    ts TIMESTAMPTZ NOT NULL,
    site_id UUID NOT NULL REFERENCES core.site(id),
    device_id UUID NOT NULL REFERENCES core.device(id),
    metric_id SMALLINT NOT NULL REFERENCES ts.metric_catalog,
    value DOUBLE PRECISION NOT NULL,
    quality SMALLINT NOT NULL DEFAULT 0, -- 0 ok, 1 intp, 2 suspect, 3 filled
    PRIMARY KEY (device_id, metric_id, ts)
) PARTITION BY RANGE (ts);

-- Index for BRIN and time-series access
CREATE INDEX idx_telemetry_ts ON ts.telemetry USING BRIN (ts);
CREATE INDEX idx_telemetry_site ON ts.telemetry (site_id, metric_id, ts DESC);

-- ==========================================
-- CTRL (Control & Overrides)
-- ==========================================
CREATE TABLE ctrl.dispatch_plan (
    plan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES core.site(id),
    issue_time TIMESTAMPTZ NOT NULL,
    model_versions JSONB,
    solver_status TEXT,
    expected_unserved REAL,
    safety_verdict TEXT,
    fallback_used BOOLEAN DEFAULT FALSE
);

CREATE TABLE ctrl.override (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES core.site(id),
    actor_id UUID REFERENCES iam.user(id),
    reason TEXT NOT NULL CHECK (length(reason) >= 10),
    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    reviewed_by UUID REFERENCES iam.user(id),
    reviewed_at TIMESTAMPTZ,
    CHECK (expires_at > starts_at AND expires_at <= starts_at + INTERVAL '2 hours')
);

-- ==========================================
-- FIN (Immutable Ledger)
-- ==========================================
CREATE TABLE fin.account (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_type TEXT NOT NULL,
    owner_id UUID NOT NULL,
    kind TEXT NOT NULL
);

CREATE TABLE fin.ledger_entry (
    entry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    txn_id UUID NOT NULL,
    account_id UUID NOT NULL REFERENCES fin.account(id),
    amount_paise BIGINT NOT NULL CHECK (amount_paise <> 0),
    ref_type TEXT, 
    ref_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE VIEW fin.balance AS
SELECT account_id, SUM(amount_paise) AS balance_paise
FROM fin.ledger_entry 
GROUP BY account_id;

-- ==========================================
-- RLS SECURITY WRAPPERS
-- ==========================================
CREATE OR REPLACE FUNCTION app.site_ids() RETURNS UUID[] LANGUAGE sql STABLE AS $$
    SELECT COALESCE(ARRAY(
        SELECT jsonb_array_elements_text(
            auth.jwt() -> 'app_metadata' -> 'site_ids'
        )::UUID
    ), '{}')
$$;

-- Enable RLS on telemetry
ALTER TABLE ts.telemetry ENABLE ROW LEVEL SECURITY;

CREATE POLICY site_scope ON ts.telemetry FOR SELECT
USING (site_id = ANY ((SELECT app.site_ids())));
