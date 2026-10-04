# **Backend and ML implementation plans for Mohalla Grid** 

I've aligned both plans to your frontend design doc (WF IDs, 8 roles, 7 USPs) and the reviewed model selection (M0–M6, A1, A2). Placeholder slots like [SS-xx: screenshot] are for you to fill, and official source URLs are at the end. 

**Gaps in the two documents that I've filled.** Each is flagged again where it appears. 

1. The model doc forecasts load and PV but never forecasts **grid availability** (outage windows). That drives your outage-hours KPI, so I add it to the scenario generator. 

2. Nothing says how battery energy is **split per household** . I add an allocation layer after the optimizer, which the fairness USP needs. 

3. DR M&V needs a **baseline method** . The documents name the screen (WF-42) but not the method. 

4. With no hardware, you need a **digital-twin simulator** . It feeds the demo, the Impact Studio and the training data. 

5. Payments, WhatsApp and IVR should run in sandbox or mock mode for the prototype. 

## **0. How the two plans fit together** 

Resident PWA / Operator / DISCOM / Admin  (React, per frontend doc) │  REST + Realtime (JWT carries role + site/feeder scope) 

┌───────────────────▼──────────────────────────────────── ────────┐ │ PLAN A: Platform backend                                        │ │  API gateway (FastAPI) · RBAC · Postgres + RLS · Orchestrator   │ │  DR/M&V · Fairness/Allocation · Wallet · Notifications · Audit  │ └───────┬─────────────────────────────────────────────┬── ────────┘ │ internal REST (versioned contracts)         │ telemetry ┌───────▼───────────────────────────┐ ┌────────▼───────────┐ │ PLAN B: ML + optimization service │        │ Site agent / digital│ │ M0–M4 forecast · M5 MPC · M6 PF   │        │ twin (MQTT, Modbus) │ │ A1/A2 · registry · drift          │        └────────────────────┘ └───────────────────────────────────┘ 

### **Division of responsibility (why):** 

- Plan A owns state, identity, money and audit. It is the only writer to the main database, so every action is logged in one place. 

- Plan B is stateless compute. It reads features through a read-only DB role and returns results. The orchestrator in Plan A persists them with the model_version attached, which makes M&V and audits reproducible. 

- The digital twin is built once in Plan B's data work and reused by Plan A as the telemetry simulator. That keeps the demo, the training data and the Impact Studio consistent. 

### **The one loop that integrates everything (every 15 min):** 

|**Step**|**Owner**|**What happens**|
|---|---|---|
|1|A|Ingest telemetry, validate, write totelemetry|
|2|B|Build features at issue timet(no look-ahead)|
|3|B|M1/M2 quantile forecasts<br>M3 conformal intervals<br>→|
|4|B|M4 gap and grid-availability scenarios (200<br>10–20 reduced)<br>→|
|5|B|M5 scenario MPC solve|
|6|B|M6 pandapower feasibility check (balanced +runpp_3ph)|
|7|A|Safety layer: rule-based checker has the final say. Persist plan, then<br>dispatch via device adapter|
|8|A|Allocation layer, stage banner, notifications, WebSocket push|
|Fallbac<br>k|A|If any B step fails or is stale (>30 min), use persistence forecasts and a<br>rules-based dispatch|



Target is under 60 seconds end to end, inside the 15-minute window. 

# **PLAN A: Backend platform** 

## **A1. Stack decisions** 

|**Layer**|**Choice**|**Reason**|
|---|---|---|
|API and<br>domain logic|**FastAPI (Python 3.11)**|Same language as the ML and<br>optimization code, so there is one shared<br>contracts package. Typed OpenAPI output<br>feeds the frontend.|
|Database|**PostgreSQL**(Supabase-<br>managed)|Your frontend doc already specifies RLS<br>and Supabase Auth, so access control is|



|||enforced in the database.|
|---|---|---|
|Time-series<br>storage|Native Postgres**time-**<br>**partitioned tables**<br>(TimescaleDB if available)|I'm unsure TimescaleDB is available on<br>current Supabase Postgres versions, so<br>verify. Partitioning is enough at prototype<br>scale.|
|Auth|Supabase Auth: phone OTP<br>for residents, email + TOTP<br>MFA for staff|Matches your doc. Custom claims carry<br>role,site_ids,feeder_ids.|
|Queue and<br>scheduler|**Redis + Celery**<br>(APScheduler is acceptable<br>for the MVP)|Drives the 15-minute loop, notifications<br>and simulation jobs.|
|Device<br>ingestion|**MQTT**(Mosquitto or EMQX)<br>plus Modbus/REST<br>adapters|One adapter interface per device type,<br>which becomes the observability ladder<br>(WF-27).|
|Realtime|Supabase Realtime or SSE|Powers live single-line diagram flows and<br>the status banner.|
|Messaging|WhatsApp Cloud API, SMS<br>and IVR provider|Inclusive-interface USP (WF-19). Use<br>templates and mock mode for the demo.|
|Payments|UPI via payment-gateway<br>**test mode**|Wallet and billing (WF-16) without<br>handling real money.|
|Observability|OpenTelemetry,<br>Prometheus, Grafana,<br>Sentry|Needed to show the system is operable.|
|Packaging|Docker Compose for demo,<br>GitHub Actions CI|Reproducible judge demo.|



**Monorepo layout:** apps/web , services/api , services/worker , services/ml , services/simulator , packages/contracts (shared Pydantic models), infra/ , docs/ (data card, model card, RBAC matrix). [SS-A1: repo tree] 

## **A2. Service modules** 

|**Module**|**Responsibility**|**Frontend**|
|---|---|---|
|||**consumers**|



|**identity**|OTP and staff login, token claims, consent<br>records, invites|WF-10, WF-18,<br>WF-50|
|---|---|---|
|**rbac**|Permission matrix as data, scope resolution,<br>require()dependency|All|
|**sites and**<br>**assets**|Sites, transformers, feeders, households,<br>appliances, batteries, PV|WF-13, WF-20,<br>WF-23, WF-24|
|**telemetry**|Ingest, validation, gap filling, aggregation views|WF-20, WF-22,<br>WF-27|
|**forecast**<br>**gateway**|Calls ML service, stores quantiles and intervals,<br>serves outlook|WF-11, WF-12,<br>WF-22|
|**orchestrator**|The 15-minute loop, state machine for stages|WF-11, WF-20,<br>WF-21|
|**dispatch and**<br>**safety**|Plan storage, rule-based constraint checker,<br>override workflow, device commands|WF-21|
|**allocation and**<br>**fairness**|Per-household fair-share, allocation log, gaming<br>flags, fairness index|WF-15, WF-25,<br>WF-32|
|**tiers and loads**|Critical/Essential/Comfort assignment, tier plans<br>in /month<br>₹|WF-13, WF-10|
|**DR and M&V**|DR requests, offers, baseline, verified delivery,<br>settlement|WF-14, WF-42|
|**wallet and**<br>**billing**|Double-entry ledger, UPI top-up and payout<br>(sandbox)|WF-16|
|**governance**|Rule proposals, voting, approvals|WF-30|
|**finance**|Revenue split, unit economics, payout reports|WF-31|
|**DISCOM view**|Feeder aggregates, stress ranking, exports, API<br>keys|WF-40 to WF-44|



|**notifications**|Alert templates in multiple languages across<br>PWA, WhatsApp, SMS, IVR|WF-19|
|---|---|---|
|**impact studio**|Scenario jobs, before/after KPIs, "simulated"<br>labelling|WF-53|
|**admin and audit**|Tenants, users, model registry view, hash-<br>chained audit log|WF-50 to WF-52|



## **A3. Data model (core tables)** 

Group the tables in this order so [SS-A3: ER diagram] reads cleanly. 

- **Tenancy and identity:** tenants , sites , feeders , transformers , users , role_assignments(user_id, role, scope_type, scope_id) , consents(user_id, purpose, granted_at, revoked_at) . 

- **Assets:** households(site_id, type: home|shop) , appliances(household_id, tier, rated_w) , devices(site_id, type, adapter, status) , batteries , pv_arrays . 

- **Time series:** telemetry(ts, device_id, metric, value, quality) , weather_obs , weather_fcst(issue_time, valid_time, …) . Both are partitioned by month. 

- **Forecasts:** forecasts(site_id, target, issue_time, valid_time, horizon_steps, q10, q50, q90, lo_80, hi_80, model_version) , gap_scenarios(run_id, scenario_id, prob, …) , forecast_explanations(forecast_id, driver, contribution) . 

- **Control:** dispatch_plans(plan_id, issue_time, model_version, solver_status, expected_unserved) , dispatch_steps , commands , `overrides(id, actor, reason, starts_at, expires_at ≤ 2h, reviewed_by)` , stage_log(site_id, stage, since) . 

- **Fairness:** fairness_rules(version, params, approved_by) , allocations(plan_id, household_id, kwh, reason_code) , fairness_metrics(window, jain_index) , gaming_flags . 

- **DR and money:** dr_requests , dr_offers , dr_responses , dr_baselines , mv_results , settlements , wallet_ledger(entry_id, account, debit, credit, ref) . 

- **Governance:** proposals , votes . 

- **Platform:** model_registry , scenario_runs , scenario_kpis , notifications , audit_log(id, ts, actor, action, resource, scope, payload, prev_hash, hash) . 

### **Design rules and reasons:** 

- Every forecast and plan row stores model_version . This is what makes M&V and audits reproducible. 

- The wallet is a double-entry ledger, so balances are derived and never edited. This makes disputes traceable. 

- The audit log is append-only, with a hash chain and no UPDATE or DELETE privilege. This supports the "immutable" claim in WF-52. 

## **A4. RBAC enforcement (matching your matrix)** 

1. **Token claims:** role , site_ids[] , feeder_ids[] , household_id (residents only). 

2. **Permission table:** permissions(role, resource, action, scope_rule) loaded from the frontend permission matrix. Keeping it as data means the matrix and the code can't drift apart. 

3. **API layer:** Depends(require("dispatch:override", scope="site")) checks permission and scope on every route. 

4. **Database layer:** RLS policies on every tenant table, for example site_id = ANY(jwt.site_ids) . Residents get household_id = jwt.household_id . This is the real enforcement, and UI hiding is only cosmetic. 

5. **Privacy by design:** 

   - DISCOM roles never get household tables. They query **materialized aggregate views** at transformer and feeder level. 

   - Apply a minimum group size (k ≥ 5 households, tune) before any aggregate is exposed. 

   - Household-level access needs a row in consents , and the access is written to the audit log. 

6. **Separation of duties as code:** 

   - DISCOM can create dr_requests but has no permission on commands . 

   - Operator can create overrides but cannot edit fairness_rules . 

   - Board approves rule versions and reviews overrides. 

   - Admin configures but has no dispatch permission. 

7. **Overrides:** a reason is mandatory and expiry is capped (default 2 h). On expiry the plan reverts automatically. The override is visible to the board and written to the audit log. 

8. **RBAC tests:** auto-generate one test per matrix cell, covering allowed and denied cases. [SS-A4: test report] 

## **A5. API surface mapped to pages** 

|**Area**|**Key endpoints**|**WF**|
|---|---|---|
|Auth|POST /auth/otp/request,/auth/otp/verify,<br>/auth/staff/login,GET /me|WF-1<br>0|
|Resident|GET /me/today(one aggregate call: stage, outlook strip, do-now<br>card, protected loads, battery, credits),GET /me/outlook,GET/PUT<br>/me/loads,GET /me/dr-offers,POST<br>/me/dr-offers/{id}/accept|decline,GET<br>/community/battery,GET /me/wallet,GET /me/impact,PUT<br>/me/settings|WF-1<br>1 to<br>18|



|Operator|GET /sites/{id}/overview,GET /sites/{id}/dispatch,<br>POST /sites/{id}/overrides,GET /sites/{id}/forecast-<br>lab,/members,/battery,/fairness,/tickets,/devices|WF-2<br>0 to<br>27|
|---|---|---|
|Board|GET/POST /proposals,POST /proposals/{id}/vote,GET<br>/finance/split|WF-3<br>0 to<br>32|
|DISCOM|GET /feeders(heatmap),GET /feeders/{id},POST /dr-<br>requests,GET /dr-requests/{id}/mv,GET /settlements,<br>GET /reports/export,/integrations/api-keys|WF-4<br>0 to<br>44|
|Admin|/tenants,/users,/roles,/models,/audit,POST<br>/scenarios/run,GET /scenarios/{id}|WF-5<br>0 to<br>53|
|Internal|/internal/ml/*(see §C), device command bus|n/a|



The /me/today aggregate means the hero screen needs one request, which also serves the low-bandwidth mode. Responses include updated_at so the "Updated 6:45 PM" stamp works from cache. 

## **A6. Feature logic** 

### **Stage banner state machine (Anticipate / Protect / Restore):** 

- _Anticipate:_ the probability of unserved load in the next 24 h exceeds a threshold. 

- _Protect:_ grid is unavailable or a shortfall is active, and tiers are being enforced. 

- _Restore:_ grid is back and SoC is below target. 

- Thresholds live in config, and every transition goes to stage_log . 

**Outlook strip (Steady / Watch / Tight):** classify each block by the scenario probability of unserved load. I suggest <10% Steady, 10–40% Watch, >40% Tight as starting values to tune. The "80% sure" sentence comes straight from this probability. 

**Plain-language text:** generate from templates with i18n keys fed by structured data, with no free-text generation. This keeps the text predictable and translatable. Hindi and other languages need native-speaker review, as your doc says. 

**"Why?" drawer:** use LightGBM pred_contrib values, grouped into human drivers (cloud cover, temperature, evening peak) and stored in forecast_explanations . 

**Allocation layer (my addition):** M5 optimizes at the **tier-aggregate** level. After each solve, the allocation layer splits battery energy across households with weighted max-min fairness. The weights are tier and household size, and a per-household cap applies. It writes allocations with a reason code for every share, which feeds the fair-share ring (WF-15) and the allocation log. Fairness index = Jain's index per window. Gaming flags cover sudden tier declarations before an event and declared-versus-measured load mismatch. 

### **DR and M&V flow:** 

1. DISCOM engineer **proposes** a request (feeder, window, kW). The backend checks it against flexibility capacity estimated from an M5 what-if. 

2. Operator accepts or declines (policy set by the board). 

3. Residents get opt-in offers. Declining has no penalty and is never logged against them. 

4. Baseline: use a rolling similar-day average with a same-day adjustment as the **settlement baseline** . Use the M1 counterfactual as a cross-check. Which baseline method is authoritative is a business-rule decision, so verify it against your DISCOM's rules. 

- 

- 5. Verified delivery = baseline actual, computed per window and stored in mv_results . 

6. Settlement writes ledger entries and credits residents. The statement is exportable. 

**Impact Studio:** a scenario job runs the same orchestrator and ML code in simulation mode, with a fixed random seed. Scenarios are cloudy week, heatwave, 4-hour grid loss, forecasts degraded 30%, and participation 20–80%. It compares against an ESMI-informed baseline. KPIs are outage hours, critical-load availability, peak reduction and voltage violations. Results are cached, and every figure is stamped simulated=true with a link to the methodology page. 

**Notifications:** one event triggers the same message across PWA push, WhatsApp, SMS and IVR from a shared template set. User channel and language preferences are respected. In India, SMS needs regulatory template registration (DLT), so verify that before relying on it. 

## **A7. Edge and the observability ladder** 

- **Adapters:** TransformerMeterAdapter , SmartMeterAdapter , InverterAdapter , BatteryBMSAdapter . Each reports capabilities, and the backend computes observability_level (1 transformer meter, 2 + smart meters, 3 + PV inverters). 

- WF-27 shows which features unlock at each level. 

- **Digital twin:** a simulator service publishes the same MQTT topics as real devices. The prototype runs entirely on it and is clearly labelled. 

- **Site agent:** a container that caches the last forecast and runs a rule-based controller if the cloud link drops. 

## **A8. Security, privacy, quality** 

- Rate limiting, input validation, secrets in environment or secret manager, TLS everywhere. 

- Consent records per purpose. Plan against India's DPDP Act 2023 and **confirm applicability** with your mentors or a legal source. 

- Data minimisation: raw household readings stay at site level, and only aggregates leave. 

- **Testing:** pytest unit tests, contract tests against OpenAPI, RLS tests per role, a solver-timeout test, and a scenario regression suite (Impact Studio numbers must not change silently). Add a load test of the loop with 100+ households. 

## **A9. Build phases (backend)** 

|**Phas**<br>**Deliverable**<br>**Done when**|
|---|



|**e**|||
|---|---|---|
|A-0|Repo, CI, Docker Compose, Postgres<br>schema, seed data|docker compose upgives a<br>working stack|
|A-1|Identity, RBAC, RLS, audit log|Matrix test suite is green|
|A-2|Telemetry ingest plus digital twin|Live data flows into charts|
|A-3|Forecast gateway,/me/today,<br>/me/outlook|WF-11 and WF-12 run on real API|
|A-4|Orchestrator, dispatch, safety layer,<br>overrides, allocation|Loop runs hands-off for 24 h|
|A-5|Impact Studio jobs|WF-53 shows before/after KPIs|
|A-6|DISCOM aggregates, DR, M&V, settlement|WF-40/41/42 run end to end|
|A-7|Wallet, notifications, governance, finance|Remaining pages|
|A-8|Hardening, demo script, docs|Rehearsed demo|



This follows your frontend build priority (tokens, then WF-11/12, WF-53, WF-40/41/42, WF-20, then the rest as designed-not-built). 

# **PLAN B: ML and optimization implementation** 

## **B1. Data assembly (the base for everything)** 

No public dataset gives Indian LT-transformer smart-meter data with rooftop PV, so **the training data is synthetic but calibrated** . State this plainly in the submission. Build it as one generator, the "digital twin," in this order: 

|**Component**|**Source**|**How it's used**|
|---|---|---|
|Appliance and|iAWE, PRECON, Ausgrid|Fridge cycles, pumps, evening|
|household shapes||peaks, shop profiles|
|Seasonality and|Grid-India (Mendeley)|Scales the synthetic load by month|



|demand shape||and hour|
|---|---|---|
|Irradiance and PV|Himawari via Open-Meteo<br>Satellite Radiation API, pvlib<br>clear-sky|Clear-sky index series and PV output|
|Weather features|**Open-Meteo Historical**<br>**Forecast API**|Leak-free training weather (past<br>forecasts, not reanalysis)|
|Supply availability,<br>voltage|Prayas ESMI|Fit an outage process (frequency and<br>duration by hour and season) and a<br>voltage distribution|
|Real PV ramp<br>check|Kaggle/IEEE India PV (34<br>days, 15 min)|Validates the PV pipeline only|



**Honesty point (important for "defensible"):** load accuracy on synthetic data is **not fieldverified** . Weather-driven errors on the PV side are realistic, but the load noise is as realistic as your generator. Report both separately and label them. [SS-B1: data card] 

**Deliverables:** docs/data_card.md (sources, licences, synthetic-versus-real split, known limits) and docs/model_card.md . Check each dataset's licence and access terms before use. The Open-Meteo free tier is non-commercial. 

## **B2. Feature pipeline** 

- One feature function used for both training and serving (prevents train-serve skew), versioned alongside the model. 

- All features are built relative to **issue time t** , so nothing after t leaks. 

- ● **Load features:** lags t−1 to t−4 (15 min), same time yesterday and last week, rolling mean/std (1 h, 24 h), hour and day-of-week as sin/cos, holiday flag, ToD tariff slab, forecast temperature and humidity. 

- **PV features:** lagged clear-sky index (last 1–6 steps at 10 min), solar zenith, hour, NWP cloud cover, upwind satellite-pixel clear-sky index as a cloud-motion proxy. 

- **Horizon handling:** for the MVP, stack training rows for horizons {15 min, 1 h, 6 h, 24 h} and pass horizon as a feature. That gives 6 core models (3 quantiles × load and PV). Split into per-horizon models later if skill differs a lot. This is the "or horizon as a feature" option in your document. 

## **B3. Models, in build order** 

|**ID**|**Model**|**Key parameters (starting points,**<br>**tune with Optuna)**|**Output**|
|---|---|---|---|
|**M0**|Smart persistence (last|none|The baselines|
||clear-sky index × clear-sky||everything|



||curve), seasonal naive<br>(yesterday, last week)||must beat|
|---|---|---|---|
|**M1**|LightGBM quantile (0.1, 0.5,<br>0.9), load|num_leaves31 (15–63),<br>learning_rate0.05 (0.01–0.1),<br>n_estimators800 + early<br>stopping 50,min_data_in_leaf<br>50, feature/bagging fraction 0.8,<br>lambda_l21|Load quantiles|
|**M2**|LightGBM quantile on clear-<br>sky index, then PV = f(kt,<br>pvlib clear-sky PV)|same ranges as M1. pvlib: tilt≈<br>latitude, azimuth 180°, losses≈<br>14%, temp coeff<br>0.35%/°C<br>≈−<br>(check the module datasheet)|PV quantiles|
|**M3**|CQR plus Adaptive<br>Conformal Inference|coverage 80% and 90%,<br>calibration window rolling 30–60<br>days, ACI γ<br>0.005. Use MAPIE or<br>≈<br>crepes|Calibrated<br>intervals (target<br>within ±3 points<br>of nominal)|
|**M4**|Gaussian-copula scenarios|N = 200 draws, reduced to 10–20 by<br>k-means|Joint<br>load/PV/grid<br>scenarios with<br>probabilities|
|**M5**|Scenario MPC (Pyomo +<br>HiGHS)|24 h at 15 min (96 steps), re-solve<br>every step. Battery 100 kWh (50–<br>200), usable SoC 20–90%, 0.3–<br>0.5C, round-trip 0.80–0.88,<br>degradation cost = replacement cost<br>÷ lifetime throughput, reserve covers<br>the Q90 gap for 2 h, unserved<br>weights 100:10:1|Dispatch plan|
|**M6**|pandapower:runppon<br>scaledcase33bw(feeder<br>view),runpp_3phon an<br>unbalanced LT network<br>(site view)|LV limit ±6% (verify against your<br>state supply code), transformer<br>alarm 80%, overload 100%|Feasibility<br>verdict and<br>voltages|
|**A1**|DLinear (lookback 96 or<br>672), LSTM/GRU (2 layers,<br>hidden 64–128, dropout<br>0.2), TFT (hidden 32–64, 4<br>heads, quantiles|same walk-forward splits as M1|Ablation table|



||0.1/0.5/0.9)|||
|---|---|---|---|
|**A2**|GAT/GraphSAGE state<br>estimator, 4–6 layers,|**must**include a weighted-least-<br>squares baseline|Stretch result,<br>reported|
||hidden 64, loss = MSE +<br>0.1 × power-flow residual,||honestly|
||20K–50K scenarios with 10<br>–50% meter masks|||



### **Details that make M4 and M5 workable:** 

- **M4 marginals:** build each variable's inverse CDF by monotone interpolation of its quantiles, adjusted by the conformal intervals. 

- **M4 correlation:** estimate from recent residuals. For a 96-step horizon, use a structured form (exponential decay over time plus a load-PV cross-correlation) instead of a full 192×192 matrix, which would be unstable. 

- **Grid availability (my addition):** add an outage-window scenario dimension, sampled from the ESMI-fitted process. Without it the optimizer can't plan for outages, which is the headline problem. 

- **M5 as an LP:** the tier-aggregate model needs no binary charge/discharge variables, because efficiency below 1 and a degradation cost already prevent simultaneous charge and discharge. Keep binaries only for island/safe mode. This keeps solve times small for HiGHS. 

- **M5 non-anticipativity:** the first few steps share one decision across all scenarios, since you can only act once. 

- **Fairness cap** lives in the allocation layer (Plan A), not in M5, to keep the optimization small. 

- **M6 and the safety layer:** M5's net injections are mapped to LT nodes, then M6 checks voltage and transformer loading. On a violation, the safety layer tightens battery power or curtails DR, then re-solves once. If that fails, it falls back to the rules-based plan. 

## **B4. Training and evaluation protocol** 

- **Splits:** expanding-window walk-forward, final 2 months as test. Tuning uses TimeSeriesSplit(n_splits=5, gap=96) , with Optuna (~50 trials) logging final values and the reason for each choice. 

- **Metrics:** MAE, RMSE, skill score = 1 − RMSE ÷ RMSE(smart persistence), pinball loss, interval coverage, and error during the 6–10 PM peak. 

      - RMSE ÷ RMSE(smart persistence), pinball RMSE ÷ RMSE(smart persistence), pinball 

- **Rules:** 

   - Same splits for every model, so comparisons are fair. 

   - Don't promise large gains at 15 min without sky images. Beating persistence there is hard. 

   - Report negative results (for example, if the GNN doesn't beat GBM) on a dedicated slide. 

- **Reproducibility:** fixed seeds, pinned dependencies, experiment tracking in MLflow. [SS-B4: results table] 

## **B5. Decision-focused evaluation and stress tests** 

1. **Forecast error versus outage hours avoided.** Degrade forecasts from 0 to 50% error, run MPC in the loop in simulation, and plot outage hours avoided. This is your strongest "defensible" chart. 

2. **Uncertainty value:** compare reserve set from quantile spread (scenario MPC) against deterministic MPC. 

3. **Stress tests:** cloudy week, heatwave, 4-hour grid loss, forecasts degraded 30%, participation 20–80%. 

4. **Fairness audit:** simulate households gaming tiers and report access metrics and Jain's index. 

5. **Observability ladder:** run the state estimator at three levels (transformer only, + smart meters, + PV inverters). This is where A2 earns its place or doesn't. 

6. All results feed the Impact Studio, labelled simulated. 

## **B6. Serving, monitoring and fallback** 

### **ML service endpoints (internal only, called by the orchestrator):** 

|**Endpoint**|**Input**|**Output**|
|---|---|---|
|POST<br>/v1/forecast|site_id,<br>issue_time|Load/PV quantiles, conformal intervals, feature<br>contributions,model_version|
|POST<br>/v1/scenario<br>s|forecast run id, N|Reduced scenario set with probabilities|
|POST<br>/v1/optimize|site state,<br>scenarios, config|Dispatch plan, solver status|
|POST<br>/v1/validate|plan, network id|Voltage/loading verdict|
|POST<br>/v1/simulate|scenario definition,<br>seed|KPI time series (Impact Studio)|
|GET<br>/v1/models|none|Registry and health|



### **Operations:** 

- **Registry:** MLflow, or a simple model_registry table with artifact paths, metrics and a champion/challenger flag. 

- **Drift monitoring:** PSI on key features (Evidently is one option) and rolling empirical coverage from ACI. 

- **Retraining:** scheduled weekly, or triggered when coverage drifts more than 5 points from nominal, or when skill falls below persistence. New models run in shadow mode before promotion. 

- **Fallback ladder:** ML service down or stale → persistence and seasonal-naive forecasts with a rules-based dispatch (reserve floor plus tier shedding order). Cloud link down → the site agent runs cached LightGBM and its local rule controller. 

- **Scaling:** one global model per feeder cluster, with a feeder embedding and a small per-feeder residual correction, rather than thousands of per-feeder models. 

## **B7. Build phases (ML)** 

|**Phas**<br>**e**|**Deliverable**|**Done when**|
|---|---|---|
|B-0|Data generator (digital twin), data<br>card|1 year of calibrated synthetic data for one<br>site|
|B-1|M0 baselines, feature pipeline,<br>evaluation harness|Baseline table exists|
|B-2|M1, M2, M3|Skill above persistence on peak window,<br>coverage within ±3 points|
|B-3|M4 and M5|Plans solve in seconds, reserve responds<br>to the Q90 gap|
|B-4|M6 and the safety layer|Violations are caught and corrected in<br>tests|
|B-5|Simulation endpoint, stress tests,<br>decision-focused curve|WF-53 numbers are produced|
|B-6|A1 ablations|Comparison table with honest conclusions|
|B-7|A2 GNN (only if time allows)|Result against the WLS baseline|



**If you must cut scope:** build M0, M1, M2, M3, M5, M6 plus A1. That matches your document's fallback set. 

# **C. Integration contract and traceability** 

### **Interface rules (both plans):** 

1. One versioned packages/contracts library defines request and response models for every internal call. CI fails if either side drifts. 

2. Every ML response carries model_version and issue_time , and the orchestrator stores both. 

3. All times are stored in UTC and shown in IST, and the 15-minute grid is aligned to the clock. 

4. The ML service never writes to the main DB. 

5. Every simulated figure carries simulated=true . 

### **USP traceability:** 

|**USP**|**Backend (Plan A)**|**ML (Plan B)**|**Pages**|
|---|---|---|---|
|1. Reliability tiers|tiers and loads, allocation,<br>tier-aware banner|M5 unserved weights<br>100:10:1|WF-10,<br>11, 13|
|2. Gap forecasting<br>with uncertainty|forecast gateway,<br>explanations|M1, M2, M3, M4|WF-11,<br>12, 22|
|3. Fairness by design|allocation, governance,<br>fairness metrics|allocation weights,<br>audit simulation|WF-15,<br>25, 30|
|4. DISCOM co-pilot<br>with verified DR|DR, M&V, settlement,<br>aggregates|M1 counterfactual, M6<br>feeder view|WF-40 to<br>43|
|5. Inclusive interface|notifications, i18n templates,<br>low-bandwidth/me/today|n/a|WF-10,<br>18, 19|
|6. Hardware-agnostic<br>layer|adapters, observability level|A2 state estimator,<br>ladder test|WF-27|
|7. Local ownership|finance, ledger, revenue split|n/a|WF-31,<br>32|



## **Official sources to cite** 

Open each one and confirm current licence and access terms before relying on it. 

- FastAPI: https://fastapi.tiangolo.com 

- Supabase (Auth, RLS, Realtime): https://supabase.com/docs 

- PostgreSQL partitioning: https://www.postgresql.org/docs/current/ddl-partitioning.html 

- ● Celery: https://docs.celeryq.dev 

- MLflow: https://mlflow.org/docs/latest 

- LightGBM: https://lightgbm.readthedocs.io 

- pvlib: https://pvlib.readthedocs.io 

- pandapower: https://pandapower.readthedocs.io 

- Pyomo: https://www.pyomo.org · HiGHS: https://highs.dev 

- MAPIE: https://mapie.readthedocs.io 

- Optuna: https://optuna.readthedocs.io 

- Open-Meteo docs (Historical Forecast, Satellite Radiation): <u>https://open-meteo.com/en/docs</u> 

- ● Prayas ESMI data: https://www.watchyourpower.org ● Papers (from your review): arXiv 1905.03222 (CQR), 2106.00170 (ACI), 2207.08815 (Grinsztajn), 2205.13504 (DLinear), 2305.18487 (Mercier), 2510.16063 (hierarchical GNN), 2510.04264 (GNN-IZR failure rates) 

- For WhatsApp, SMS/DLT, UPI and DPDP Act specifics, use the provider's or government's official page. I haven't verified those details here. 

