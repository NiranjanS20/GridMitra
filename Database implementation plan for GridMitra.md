## **Database implementation plan for GridMitra**

This plan matches the two earlier plans: the same module names, WF IDs and 15-minute control loop. Placeholder slots like \[SS-Dx: screenshot\] are for you to fill, and official source URLs are at the end.

### **D0. Which databases and stores you need**

You need **one primary database (PostgreSQL) plus three supporting stores**. Everything else in the documents fits inside Postgres.

| **Store**                                                    | **Status**                  | **Role**                                                                                | **Why**                                                                                                                       |
| ------------------------------------------------------------ | --------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **PostgreSQL** (Supabase-managed)                            | **Required**                | Primary store for all transactional, relational, time-series, geospatial and audit data | Your frontend doc already specifies Postgres row-level security, and one engine means one access-control model                |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| **Redis**                                                    | **Required**                | Celery broker, response cache, rate limits, per-site loop locks, pub/sub                | Fast and disposable. Losing Redis must never lose business state                                                              |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| **Object storage** (S3-compatible, such as Supabase Storage) | **Required**                | Model artifacts, Parquet datasets, DISCOM exports, scenario outputs                     | Large files don't belong in Postgres                                                                                          |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| **SQLite on the site agent**                                 | **Required** (for fallback) | Offline buffer, cached forecast and plan, local rule config                             | Your fallback ladder depends on this when the cloud link drops                                                                |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| PostGIS (Postgres extension)                                 | Required extension          | Feeder and transformer geometry for WF-40 map                                           | Spatial queries without a separate GIS database                                                                               |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| TimescaleDB (extension)                                      | Optional                    | Compression and continuous aggregates                                                   | I'm unsure it is available on current Supabase Postgres versions, so verify. Native partitioning is enough at prototype scale |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| DuckDB over Parquet                                          | Optional                    | Fast offline analysis for ML training and notebooks                                     | A library, not a server                                                                                                       |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| MLflow backend store                                         | Optional                    | Experiment tracking                                                                     | Needs its own small Postgres. Skip it and use the ml.\* tables for the MVP                                                    |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |
| MQTT broker                                                  | Transport, not a DB         | Device telemetry ingestion                                                              | Buffers messages. Persistence happens in Postgres                                                                             |
| ---                                                          | ---                         | ---                                                                                     | ---                                                                                                                           |

**Deliberately not used, with reasons (useful for the "defensible" criterion):**

- **MongoDB or other document stores.** Your data is strongly relational (households, tiers, allocations, ledgers) and needs constraints and RLS. JSONB covers the few flexible fields.
- **Neo4j or other graph databases.** Feeder topology is a radial tree. Adjacency tables (bus, line) are enough, and pandapower builds its network from them.
- **Kafka or Elasticsearch.** Your volume is small, and MQTT plus Postgres covers ingestion and queries. Adding them would increase operating cost without a benefit you could demonstrate.
- **A separate time-series database (InfluxDB etc.).** A second access-control model would break "enforce in the database."

### **D1. Design principles (each with its reason)**

1. **Postgres is the single source of truth.** Redis, caches and the edge SQLite hold only derived or temporary state, so any of them can be rebuilt.
2. **Enforce access in the database, not only the API.** This is your RBAC principle, implemented with RLS.
3. **Immutable facts, versioned rules.** Forecasts, plans, ledger entries and audit events are insert-only. Fairness rules are new versions, never edits. This is what makes M&V, disputes and audits reproducible.
4. **Every derived row records its provenance.** model_version, rule_version and issue_time appear on forecasts, plans and allocations.
5. **Money is integer paise and double-entry.** No floats and no editable balances.
6. **Time is UTC in storage, IST in display,** on a clock-aligned 15-minute grid.
7. **SQL migrations are the schema's source of truth,** not an ORM. RLS policies, partitions and triggers are SQL-native, and ORM auto-generation tends to miss them. SQLAlchemy models reflect the schema and don't create it.
8. **Portability.** Wrap Supabase-specific calls (auth.jwt()) in one app.claims() function. If you need to move to plain Postgres, only that function changes.

### **D2. Schema organization**

Use one schema per domain so grants and RLS stay readable. \[SS-D2: ER diagram per schema\]

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>Schema</strong></p></th><th><p><strong>Contents</strong></p></th></tr><tr><th><pre><code>iam</code></pre></th><th><p>users, role assignments, consents, data-subject requests, encrypted contacts</p></th></tr><tr><th><pre><code>core</code></pre></th><th><p>tenants, sites, households, appliances, devices, batteries, PV arrays, tier plans, reference data</p></th></tr><tr><th><pre><code>grid</code></pre></th><th><p>feeders, transformers, buses, lines, meter mapping (with PostGIS geometry)</p></th></tr><tr><th><pre><code>ts</code></pre></th><th><p>telemetry, weather, aggregates, metric catalog</p></th></tr><tr><th><pre><code>ml</code></pre></th><th><p>forecasts, scenarios, explanations, model registry, monitoring</p></th></tr><tr><th><pre><code>ctrl</code></pre></th><th><p>dispatch plans and steps, commands, overrides, stage log, alerts</p></th></tr><tr><th><pre><code>fair</code></pre></th><th><p>rule versions, allocations, fairness metrics, gaming flags</p></th></tr><tr><th><pre><code>dr</code></pre></th><th><p>requests, offers, responses, baselines, M&amp;V, settlements</p></th></tr><tr><th><pre><code>fin</code></pre></th><th><p>accounts, ledger, payments, revenue splits</p></th></tr><tr><th><pre><code>gov</code></pre></th><th><p>proposals, votes</p></th></tr><tr><th><pre><code>sim</code></pre></th><th><p>scenario definitions, runs, KPIs</p></th></tr><tr><th><pre><code>ops</code></pre></th><th><p>outbox, idempotency keys, notifications, templates, tickets</p></th></tr><tr><th><pre><code>audit</code></pre></th><th><p>hash-chained event log</p></th></tr><tr><th><pre><code>discom</code></pre></th><th><p>aggregate-only views for utility roles</p></th></tr></thead></table></div>

### **D3. Table design by domain**

#### **iam**

- user(id, auth_id, kind: resident|staff, status, created_at)
- user_contact(user_id, phone_enc bytea, email_enc bytea): encrypted with pgcrypto and kept apart from everything else, so analytics never touch it.
- role_assignment(user_id, role, scope_type: site|feeder|tenant|global, scope_id, granted_by, valid_from, valid_to)
- consent(user_id, purpose, granted_at, revoked_at, text_version)
- data_request(user_id, kind: export|erasure, status, requested_at): supports your privacy story.

#### **core**

- tenant, site(id, tenant_id, feeder_id, transformer_id, capacity_kva, timezone, observability_level)
- household(id, site_id, type: home|shop, members, pseudonym_id): no names or phone numbers here.
- appliance(id, household_id, tier: critical|essential|comfort, rated_w, catalog_id)
- device(id, site_id, kind, adapter, status, last_seen), battery(site_id, kwh, soc_min, soc_max, c_rate, rte, replacement_cost, lifetime_throughput), pv_array(site_id, kwp, tilt, azimuth, loss, temp_coeff)
- tier_plan(id, name, price_paise_month, protected_tiers), household_plan(household_id, plan_id, valid_from)
- Reference tables: tariff_slab, holiday, appliance_catalog, location(id, lat, lon, geom).

#### **grid (feeds M6 and A2)**

- feeder(id, name, geom geometry(LineString)), transformer(id, feeder_id, kva, geom)
- network(id, site_id, kind: lt|mv_demo, version)
- bus(network_id, bus_id, vn_kv, phase_mask, geom), line(network_id, from_bus, to_bus, length_m, r_ohm_km, x_ohm_km, phases)
- meter_map(meter_id, bus_id, phase): the link between smart meters and network nodes. Also needed for the A2 sparse-metering masks.

#### **ts**

sql

create table ts.metric_catalog (

metric_id smallint primary key,

name text unique not null, -- 'p_kw','v_ln','soc_pct','irr_wm2', ...

unit text not null,

min_valid real, max_valid real -- range checks at ingest

);

create table ts.telemetry (

ts timestamptz not null,

site_id uuid not null, -- denormalised so RLS stays cheap

device_id uuid not null,

metric_id smallint not null references ts.metric_catalog,

value double precision not null,

quality smallint not null default 0, -- 0 ok,1 interpolated,2 suspect,3 filled

primary key (device_id, metric_id, ts)

) partition by range (ts);

create index on ts.telemetry using brin (ts);

create index on ts.telemetry (site_id, metric_id, ts desc);

- ts.agg_15m(site_id, entity_type, entity_id, metric_id, bucket, avg, min, max, n): written incrementally by the worker. This is what M1, M&V and the allocation layer read.
- ts.weather_obs(location_id, ts, ...) and ts.weather_fcst(location_id, issue_time, valid_time, ...) with index (location_id, issue_time, valid_time).

**Leak-free rule at the query level:** training and inference features may only read weather_fcst rows where issue_time <= t. Put this inside the feature view so nobody can forget it. This is the leakage point from your model review.

**Late data:** ingest with INSERT ... ON CONFLICT (device_id, metric_id, ts) DO UPDATE, which also makes edge re-sends idempotent. A watermark job recomputes affected 15-minute buckets.

#### **ml**

- forecast(site_id, target, issue_time, valid_time, horizon_steps, q10, q50, q90, lo_80, hi_80, lo_90, hi_90, model_version): partitioned monthly by issue_time, with a unique key on (site_id, target, issue_time, valid_time, model_version).
- scenario_set(run_id, site_id, issue_time, n_full, n_reduced, model_version) and scenario(run_id, idx, prob, load_kw real\[96\], pv_kw real\[96\], grid_avail smallint\[96\]). Arrays keep one row per scenario instead of 96, which cuts rows by about 96 times.
- forecast_explanation(forecast_id, driver, contribution): from LightGBM pred_contrib, grouped into human drivers.
- model_registry(model_id, kind: M1|M2|…|A2, version, artifact_uri, checksum, params jsonb, data_card_version, status: shadow|champion|retired, created_at)
- training_run, eval_metric(model_id, split, horizon, metric, value), drift_metric(ts, model_id, feature, psi), coverage_monitor(ts, model_id, rolling_coverage, alpha_t).

#### **ctrl**

- dispatch_plan(plan_id, site_id, issue_time, model_versions jsonb, solver_status, expected_unserved, safety_verdict, fallback_used bool)
- dispatch_step(plan_id, step, ts, battery_kw, soc_kwh, grid_kw, curtail_kw, unserved_critical, unserved_essential, unserved_comfort)
- command(id, plan_id, device_id, payload, status, sent_at, ack_at)
- override:

sql

create table ctrl.override (

id uuid primary key default gen_random_uuid(),

site_id uuid not null, actor_id uuid not null,

reason text not null check (length(reason) >= 10),

starts_at timestamptz not null default now(),

expires_at timestamptz not null,

reviewed_by uuid, reviewed_at timestamptz,

check (expires_at > starts_at and expires_at <= starts_at + interval '2 hours')

);

The 2-hour cap is a hard database rule, matching your accountability principle.

- stage_log(site_id, stage: anticipate|protect|restore, since, trigger jsonb), alert.

#### **fair**

- rule_version(id, site_id, version, params jsonb, proposed_by, approved_by, effective_from): insert-only.
- allocation(plan_id, step, household_id, kwh, reason_code, rule_version_id): this is the "who got what and why" log.
- fairness_metric(site_id, window, jain_index, access_ratio_by_tier jsonb), gaming_flag(household_id, kind, evidence jsonb, raised_at, status).

#### **dr**

sql

create extension if not exists btree_gist;

create table dr.request (

id uuid primary key default gen_random_uuid(),

feeder_id uuid not null, created_by uuid not null,

window tstzrange not null, target_kw numeric not null,

status text not null,

exclude using gist (feeder_id with =, window with &&) -- no overlapping requests

);

- offer(request_id, household_id, kw_offered, credit_paise), response(offer_id, decision, decided_at): declining stores no penalty field at all.
- baseline(request_id, method, params jsonb, series jsonb), mv_result(request_id, baseline_kwh, actual_kwh, delivered_kwh, method, confidence), settlement(request_id, statement jsonb, ledger_txn_id).

#### **fin**

sql

create table fin.ledger_entry (

entry_id uuid primary key default gen_random_uuid(),

txn_id uuid not null,

account_id uuid not null references fin.account,

amount_paise bigint not null check (amount_paise <> 0), -- + credit / − debit

ref_type text, ref_id uuid,

created_at timestamptz not null default now()

);

\-- DEFERRABLE INITIALLY DEFERRED constraint trigger:

\-- raise if sum(amount_paise) per txn_id <> 0 at commit

create view fin.balance as

select account_id, sum(amount_paise) as balance_paise

from fin.ledger_entry group by account_id;

- Also account(owner_type, owner_id, kind), payment(provider_ref, status) (sandbox), revenue_split(period, residents, operator, battery_fund).

#### **gov**

- proposal(id, site_id, kind, payload jsonb, status, opens_at, closes_at), vote(proposal_id, voter_id, choice, unique(proposal_id, voter_id)). An approved proposal creates a fair.rule_version.

#### **sim (Impact Studio)**

sql

create table sim.kpi (

run_id uuid, kpi text,

baseline_value numeric, with_system_value numeric,

simulated boolean not null default true check (simulated = true)

);

The check is deliberate: during the prototype phase the database refuses to store a "field result." scenario(definition jsonb, seed int, code_version) and run(scenario_id, model_versions jsonb, status, finished_at) make runs reproducible.

#### **ops and audit**

- outbox(id, topic, payload, status, attempts, next_attempt_at): transactional outbox. A plan and its notification event are committed in the same transaction, then the worker publishes them. This avoids the "plan saved but alert lost" failure.
- idempotency_key(key, scope, response_hash, created_at), notification, template(key, lang, channel, body, version), ticket.
- audit.event(id, ts, actor_id, actor_role, action, resource, scope_id, payload jsonb, prev_hash, hash): a trigger computes hash = sha256(prev_hash || row contents) under an advisory lock so the chain stays linear. UPDATE and DELETE are revoked and also blocked by trigger. audit.verify_chain() is run nightly. At larger scale, use one chain per tenant to avoid write contention.

### **D4. Access control in the database**

**Postgres roles**

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>Role</strong></p></th><th><p><strong>Used by</strong></p></th><th><p><strong>Rights</strong></p></th></tr><tr><th><p>authenticated (via SET LOCAL ROLE)</p></th><th><p>API on behalf of users</p></th><th><p>Subject to RLS</p></th></tr><tr><th><pre><code>app_worker</code></pre></th><th><p>Orchestrator, jobs</p></th><th><p>Scoped writes, every action audited</p></th></tr><tr><th><pre><code>ml_reader</code></pre></th><th><p>ML service</p></th><th><p>SELECT on feature views only. Cannot write</p></th></tr><tr><th><pre><code>auditor_ro</code></pre></th><th><p>Auditor/Regulator</p></th><th><p>Read-only on audit, sim, M&amp;V views</p></th></tr><tr><th><pre><code>migrator</code></pre></th><th><p>CI</p></th><th><p>DDL only, not used at runtime</p></th></tr></thead></table></div>

**How RLS works with the API (this is what makes "database-enforced" true):** per request, the API opens a transaction, sets request.jwt.claims, and runs SET LOCAL ROLE authenticated. RLS then applies even though the API uses a shared connection pool.

sql

create function app.site_ids() returns uuid\[\] language sql stable as \$\$

select coalesce(array(

select jsonb_array_elements_text(

auth.jwt() -> 'app_metadata' -> 'site_ids')::uuid), '{}')

\$\$;

create policy site_scope on ts.telemetry for select

using (site_id = any ((select app.site_ids())));

Wrapping the call in (select ...) lets Postgres evaluate it once per query instead of per row. This is Supabase's recommended performance pattern, so confirm it in their docs.

**Per-role policy patterns**

- **Resident:** household_id = (claims.household_id).
- **Operator and board:** site_id = ANY(site_ids), with write limits per table.
- **DISCOM Engineer and Analyst:** no policy on household or ts.telemetry tables at all. They read the discom schema only, which exposes transformer and feeder aggregates.
- **Minimum group size:** any view derived from household meters enforces having count(distinct household_id) >= 5 (tune the 5).
- **Household drill-down for DISCOM:** only through a SECURITY DEFINER function that checks an active consent row and writes an audit.event.
- **Demo/Evaluator:** a separate synthetic tenant. RLS keeps it apart from real data.

**Separation of duties in grants:** DISCOM roles have INSERT on dr.request and nothing on ctrl.command. The operator has INSERT on ctrl.override and nothing on fair.rule_version. Admin has no write on ctrl.\*. \[SS-D4: grant matrix\]

### **D5. Time-series strategy**

**Ingestion rates (my assumptions, adjust to your design):**

- Site-level devices (transformer meter, battery, inverters): **1-minute**.
- Household smart meters: **15-minute**.
- A rough one-site, 100-household estimate is about 30 million rows per year, which is single-digit GB with indexes. This is an order-of-magnitude estimate to re-check with real data. If you scale to dozens of sites, move to TimescaleDB compression.

**Partitioning:** monthly range partitions on ts. Create them with pg_partman if available, or a scheduled job that creates next month's partition ahead of time.

**Retention and downsampling**

| **Data**                    | **Keep**     | **Then**                                                                   |
| --------------------------- | ------------ | -------------------------------------------------------------------------- |
| Raw 1-minute telemetry      | 13 months    | Drop partition                                                             |
| ---                         | ---          | ---                                                                        |
| 15-minute aggregates        | Indefinitely | None                                                                       |
| ---                         | ---          | ---                                                                        |
| Forecasts (all horizons)    | 90 days      | Keep horizons {1, 4, 24, 96 steps} for evaluation                          |
| ---                         | ---          | ---                                                                        |
| Scenarios                   | 30 days      | Delete                                                                     |
| ---                         | ---          | ---                                                                        |
| Dispatch plans, allocations | Indefinitely | They're small and audit-relevant                                           |
| ---                         | ---          | ---                                                                        |
| Audit log                   | Per policy   | I propose a multi-year period, but confirm any legal retention requirement |
| ---                         | ---          | ---                                                                        |

Schedule jobs with pg_cron.

**Data quality:** range checks from metric_catalog, a quality flag on every row, gap-filling recorded as quality = 3 (never silently), and a missing-data alert per device in WF-27.

### **D6. Integrity and consistency rules**

- **Ledger:** deferred constraint trigger enforces zero-sum per transaction. The balance is a view.
- **Audit chain:** hash-linked, append-only, nightly verification.
- **Idempotency:** a client-supplied key on money, DR and override endpoints. Telemetry uses its natural primary key.
- **Outbox:** all cross-system events (notifications, device commands) go through it.
- **Concurrency:** one control loop per site, guarded by a Redis lock (SET NX PX) and a Postgres advisory lock as a backstop.
- **Exclusion constraints:** no overlapping DR windows per feeder.
- **Optimistic concurrency:** version columns on editable rows (settings, tiers).

### **D7. Redis design**

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>Use</strong></p></th><th><p><strong>Key pattern</strong></p></th><th><p><strong>TTL</strong></p></th></tr><tr><th><p>Celery broker and results</p></th><th><p>Celery defaults, separate DB number</p></th><th><p>Short</p></th></tr><tr><th><p>/me/today cache</p></th><th><pre><code>today:{household}:{loop_id}</code></pre></th><th><p>Until next loop (≤15 min)</p></th></tr><tr><th><p>Loop lock</p></th><th><pre><code>lock:loop:{site}</code></pre></th><th><p>Loop budget (for example 120 s)</p></th></tr><tr><th><p>Rate limits, OTP attempts</p></th><th><pre><code>rl:{ip_or_phone}</code></pre></th><th><p>Minutes</p></th></tr><tr><th><p>Realtime fan-out</p></th><th><p>pub/sub channels site:{id}</p></th><th><p>n/a</p></th></tr></thead></table></div>

**Rule:** if Redis is wiped, the system recovers from Postgres within one loop.

### **D8. Object storage layout**

- datasets/{data_card_version}/…parquet: training sets from the digital twin. The version links to the data card.
- models/{model_version}/…: artifacts with a checksum stored in ml.model_registry.
- scenario-results/{run_id}/…: large simulation outputs.
- exports/…: DISCOM reports, delivered via short-lived signed URLs.
- Apply lifecycle rules (for example auto-delete exports after 30 days).

### **D9. Edge store (SQLite on the site agent)**

- Tables: telemetry_buffer(device_id, metric_id, ts, value, sent), last_forecast, last_plan, config_snapshot (tiers, rule version, safety limits), command_log.
- **Sync:** store and forward. On reconnect, the agent sends unsent rows, and the cloud's idempotent upsert makes duplicates harmless.
- The agent keeps working on the cached plan and a rule-based controller while offline. This implements the fallback ladder from Plan B.

### **D10. Who touches which store**

| **Service**         | **Postgres**                   | **Redis**          | **Object store**   | **Edge SQLite** |
| ------------------- | ------------------------------ | ------------------ | ------------------ | --------------- |
| API                 | RLS-scoped read/write          | Cache, rate limits | Signed URLs        | n/a             |
| ---                 | ---                            | ---                | ---                | ---             |
| Worker/orchestrator | Scoped writes                  | Broker, locks      | Artifacts, exports | n/a             |
| ---                 | ---                            | ---                | ---                | ---             |
| ML service          | **Read-only** via ml_reader    | n/a                | Load models        | n/a             |
| ---                 | ---                            | ---                | ---                | ---             |
| Simulator           | Writes telemetry (demo tenant) | n/a                | Reads datasets     | n/a             |
| ---                 | ---                            | ---                | ---                | ---             |
| Site agent          | n/a (via API)                  | n/a                | n/a                | Buffer, cache   |
| ---                 | ---                            | ---                | ---                | ---             |

### **D11. Performance plan**

- **Page budgets:** WF-11 /me/today p95 under 200 ms, served from the cached aggregate payload. WF-20 and WF-22 reads use agg_15m and never scan raw telemetry.
- **Connection pooling:** use the provider's pooler. In transaction-pooling mode, disable prepared-statement caching in your async driver (asyncpg needs this), and verify against your driver's docs.
- **Indexes:** every FK used in RLS or joins, BRIN on time columns, partial indexes for active rows (such as open overrides).
- **Load test:** load one year of synthetic data for 100 households and check the p95 numbers above. \[SS-D11: query timings\]

### **D12. Security, privacy and recovery**

- Encryption in transit and at rest (provider-level), plus column-level pgcrypto for phone and email.
- Pseudonymous household_id everywhere except iam.
- **DPDP Act 2023:** consent table, export/erasure requests (iam.data_request), minimisation by design. Confirm applicability and obligations with an official source or your mentors.
- **Erasure with an immutable ledger and audit log:** erase iam.user_contact and detach the pseudonym link, so the immutable records stay but no longer identify a person. Confirm this approach is acceptable.
- **Backups:** managed daily backups, with point-in-time recovery if your plan includes it (verify). Add a nightly logical dump to object storage so the demo can be rebuilt. Run a restore drill once. \[SS-D12: restore test\]
- Secrets in environment or a secret manager, and no service-role key in any client.

### **D13. Migrations, environments, seeding**

- **Tooling:** Supabase CLI SQL migrations, one file per change, reviewed in CI.
- **Environments:** local (Docker Postgres), staging, demo/prod. Staging and demo use the synthetic tenant only.
- **Seed data:** reference tables, one demo site, 100 households, and a year of synthetic telemetry from the Plan B generator.
- **Rollback:** every migration has a tested down step, or a documented forward-fix.

### **D14. Testing**

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>Test</strong></p></th><th><p><strong>Tool</strong></p></th><th><p><strong>What it proves</strong></p></th></tr><tr><th><p>RLS matrix</p></th><th><p>pgTAP, one test per matrix cell</p></th><th><p>Every allowed and denied case from your permission matrix</p></th></tr><tr><th><p>Ledger invariants</p></th><th><p>Property tests</p></th><th><p>Zero-sum, no negative drift</p></th></tr><tr><th><p>Audit chain</p></th><th><pre><code>audit.verify_chain()</code></pre></th><th><p>Tamper evidence</p></th></tr><tr><th><p>Migrations</p></th><th><p>Up/down in CI</p></th><th><p>Safe schema changes</p></th></tr><tr><th><p>Data quality</p></th><th><p>Constraint tests plus ingest checks</p></th><th><p>Range, duplicates, late data</p></th></tr><tr><th><p>Contract</p></th><th><p>OpenAPI vs schema</p></th><th><p>API and DB agree</p></th></tr><tr><th><p>Performance</p></th><th><p>Seeded-data benchmark</p></th><th><p>Page budgets</p></th></tr></thead></table></div>

### **D15. Build phases**

| **Phase** | **Deliverable**                                          | **Done when**                           | **Pairs with** |
| --------- | -------------------------------------------------------- | --------------------------------------- | -------------- |
| D-0       | Postgres, extensions, schemas, roles, migration pipeline | CI builds a fresh DB                    | A-0            |
| ---       | ---                                                      | ---                                     | ---            |
| D-1       | iam, core, grid, RLS, audit chain                        | pgTAP matrix green                      | A-1            |
| ---       | ---                                                      | ---                                     | ---            |
| D-2       | ts partitions, catalog, ingest upserts, aggregates       | Simulator data lands, buckets recompute | A-2, B-0       |
| ---       | ---                                                      | ---                                     | ---            |
| D-3       | ml, feature views, ml_reader                             | ML service reads without write rights   | A-3, B-2       |
| ---       | ---                                                      | ---                                     | ---            |
| D-4       | ctrl, fair, outbox, overrides                            | 24-hour loop runs end to end            | A-4, B-3       |
| ---       | ---                                                      | ---                                     | ---            |
| D-5       | sim, scenario runs                                       | WF-53 numbers stored and reproducible   | A-5, B-5       |
| ---       | ---                                                      | ---                                     | ---            |
| D-6       | dr, fin, discom views, consent drill-down                | WF-42 settlement ties to ledger         | A-6            |
| ---       | ---                                                      | ---                                     | ---            |
| D-7       | gov, ops, retention jobs, backups, perf tuning           | Restore drill passed, budgets met       | A-7, A-8       |
| ---       | ---                                                      | ---                                     | ---            |

### **D16. Page-to-table traceability**

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>WF</strong></p></th><th><p><strong>Main tables and views</strong></p></th></tr><tr><th><p>WF-10 onboarding</p></th><th><p>iam.user, iam.consent, core.household, core.appliance</p></th></tr><tr><th><p>WF-11 Today</p></th><th><p>ctrl.stage_log, ml.forecast, ml.scenario, ctrl.dispatch_step, fair.allocation, fin.balance (cached)</p></th></tr><tr><th><p>WF-12 Outlook</p></th><th><p>ml.forecast, ml.forecast_explanation</p></th></tr><tr><th><p>WF-13 Loads</p></th><th><p>core.appliance, core.household_plan</p></th></tr><tr><th><p>WF-14 Shift and Earn</p></th><th><p>dr.offer, dr.response, fin.ledger_entry</p></th></tr><tr><th><p>WF-15 Community battery</p></th><th><p>ts.agg_15m, fair.allocation</p></th></tr><tr><th><p>WF-16 Wallet</p></th><th><p>fin.account, fin.ledger_entry, fin.payment</p></th></tr><tr><th><p>WF-20/21 Operator</p></th><th><p>ts.agg_15m, ctrl.dispatch_plan/step, ctrl.override, ctrl.command</p></th></tr><tr><th><p>WF-22 Forecast Lab</p></th><th><p>ml.forecast, ml.coverage_monitor, ml.drift_metric</p></th></tr><tr><th><p>WF-25 Fairness</p></th><th><pre><code>fair.*</code></pre></th></tr><tr><th><p>WF-27 Devices</p></th><th><p>core.device, ts.telemetry quality flags</p></th></tr><tr><th><p>WF-30/31/32 Board</p></th><th><p>gov.*, fin.revenue_split, fair.fairness_metric</p></th></tr><tr><th><p>WF-40/41 DISCOM</p></th><th><p>discom.* views, grid.*, PostGIS geometry</p></th></tr><tr><th><p>WF-42 DR Center</p></th><th><p>dr.*, fin.ledger_entry</p></th></tr><tr><th><p>WF-50/51/52 Admin</p></th><th><p>iam.role_assignment, ml.model_registry, audit.event</p></th></tr><tr><th><p>WF-53 Impact Studio</p></th><th><pre><code>sim.*</code></pre></th></tr></thead></table></div>

### **Official sources to cite**

Confirm each page's current wording before citing.

- PostgreSQL row security: <https://www.postgresql.org/docs/current/ddl-rowsecurity.html>
- PostgreSQL partitioning: <https://www.postgresql.org/docs/current/ddl-partitioning.html>
- PostgreSQL constraints (exclusion): <https://www.postgresql.org/docs/current/ddl-constraints.html>
- PostgreSQL triggers: <https://www.postgresql.org/docs/current/sql-createtrigger.html>
- pgcrypto: <https://www.postgresql.org/docs/current/pgcrypto.html>
- PostGIS: <https://postgis.net/documentation/>
- Supabase RLS: <https://supabase.com/docs/guides/database/postgres/row-level-security>
- Supabase auth hooks (custom claims): <https://supabase.com/docs/guides/auth/auth-hooks>
- Supabase migrations: <https://supabase.com/docs/guides/deployment/database-migrations>
- Supabase pg_cron: <https://supabase.com/docs/guides/database/extensions/pg_cron>
- pgTAP: <https://pgtap.org>
- TimescaleDB: <https://docs.timescale.com>
- Redis: <https://redis.io/docs>
- SQLite: <https://www.sqlite.org/docs.html>
- DuckDB: <https://duckdb.org/docs>
- Mosquitto (MQTT): <https://mosquitto.org/documentation/>
- MLflow: <https://mlflow.org/docs/latest>
- For the DPDP Act 2023, use the Government of India's official gazette or MeitY page. I haven't verified the exact URL.