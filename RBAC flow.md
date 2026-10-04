## **MVP roles: the top 4**

**Resident, Operator, DISCOM Engineer, and Demo/Evaluator.** Platform Admin exists only as a seeded developer account with no UI.

### **Why these four**

I picked them from your own build priority list (WF-11/12, then WF-53, then WF-40/41/42, then WF-20). Together they cover every hero screen and the one end-to-end story judges will look for: forecast → plan → DR request → operator accepts → resident opts in → verified result.

| **Role**            | **Hero screens it unlocks**              | **USPs it carries**                                | **Why it can't be dropped**                                                                   |
| ------------------- | ---------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Resident**        | WF-10, 11, 12, 13, 14                    | Tiers, gap forecasting, inclusive interface        | It is the product's face and the main user                                                    |
| ---                 | ---                                      | ---                                                | ---                                                                                           |
| **Operator**        | WF-20, 21                                | Fairness, hardware-agnostic layer, local operation | The only role that can override, and it holds the accept/decline step in DR                   |
| ---                 | ---                                      | ---                                                | ---                                                                                           |
| **DISCOM Engineer** | WF-40, 41, 42                            | Verified DR, co-pilot                              | The only role that can send a DR request, so without it that USP can't be demonstrated        |
| ---                 | ---                                      | ---                                                | ---                                                                                           |
| **Demo/Evaluator**  | WF-53 (plus read-only views of the rest) | Measurable impact, simulated                       | Gives judges a safe sandbox, and in your matrix only Admin and Demo can run the Impact Studio |
| ---                 | ---                                      | ---                                                | ---                                                                                           |

**Why Demo instead of Admin as the fourth.** WF-53 is your measurable-impact proof, and Demo can run it. Admin's real work (user management, model registry, audit browsing) is mostly "designed, not built" territory. Seed users with a script and document it.

### **What each deferred role becomes in the MVP**

| **Deferred role**  | **How the MVP covers its job**                                                                                                                 | **What you say in the write-up**                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Board member**   | Override review is marked "pending review" (still logged). The fairness rule is one seeded rule_version, and the DR policy is a default config | "Governance flows designed (WF-30 to 32), not built"                   |
| ---                | ---                                                                                                                                            | ---                                                                    |
| **DISCOM Analyst** | The DISCOM Engineer's read-only views cover this                                                                                               | Same RLS pattern, add later                                            |
| ---                | ---                                                                                                                                            | ---                                                                    |
| **Auditor**        | No UI, but audit.event is still written and hash-chained from day one                                                                          | "Audit data is captured. The auditor view is a read-only layer on top" |
| ---                | ---                                                                                                                                            | ---                                                                    |
| **Platform Admin** | Seeded account plus scripts                                                                                                                    | "Admin console designed, not built"                                    |
| ---                | ---                                                                                                                                            | ---                                                                    |

### **What to keep from the full RBAC design**

Keep these even with four roles, because they are what make your access-control claim defensible:

1. **The full database design.** Build iam.permission, iam.role_assignment and the RLS pattern for all 8 roles, but write policies only for the 4 active ones. Adding the rest later is then a data change, not a redesign.
2. **Separation of duties that you can demonstrate with only 4 roles:**
   - DISCOM can create a DR request but has no permission on ctrl.command.
   - Operator can override but cannot edit fair.rule_version.
   - Resident can only see their own household (RLS), and DISCOM sees aggregates only.
3. **Override rules.** Reason required, expiry capped at 2 hours (database check), and everything audited. Keep the four-eyes constraint in the schema even though the reviewer role is deferred.
4. **Test the four-role matrix automatically.** That is 4 roles × the capability rows, covering allowed and denied cases, plus cross-site and cross-household isolation tests.
5. **Demo isolation.** The Demo role gets its own synthetic tenant and can't touch real data.

### **Auth simplification for the MVP**

- Resident: phone OTP (use the provider's test mode for the demo).
- Staff roles and Demo: email login. Add TOTP MFA only for the override action if time is short, and note the full step-up design as planned.
- One active role per token. Skip the multi-role switcher for now.

### **MVP end-to-end flow to rehearse**

1. **Demo/Evaluator** runs a "4-hour grid loss" scenario in WF-53 and sees simulated before/after KPIs.
2. **Resident** opens WF-11, sees the stage banner and outlook, and gets a "Do this now" card.
3. **DISCOM Engineer** sees a stressed transformer in WF-40/41 and sends a DR request in WF-42.
4. **Operator** accepts it in WF-20/21, and may start an override with a reason.
5. **Resident** opts in to the offer in WF-14.
6. **DISCOM Engineer** sees baseline versus actual and the settlement.

That walkthrough touches all four roles and five of your seven USPs.

### **What is safe to treat as settled**

- **Architecture and division of labour:** Postgres as the single source of truth, a stateless ML service, the 15-minute control loop, and the fallback ladder. These follow directly from your frontend doc and the model review.
- **Model order:** M0 → M1/M2 → M3 → M4/M5 → M6, with A1 and A2 as ablation and stretch. This matches your reviewed document.
- **RBAC principles:** RLS plus API checks, separation of duties, and override rules. These come from your own matrix.
- **MVP roles:** Resident, Operator, DISCOM Engineer, Demo/Evaluator, derived from your build-priority list.

### **What you must confirm before calling it final**

| **#** | **Item**                                                                                                                                                                                                    | **Why it matters**                               | **Action**                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| 1     | **The permission matrix.** Your PDF export lost its column alignment, so I rebuilt it row by row                                                                                                            | One misread cell means a wrong access rule       | Check my table against your original and fix any cell                        |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |
| 2     | **Design choices I added** that are in neither document: grid-availability scenarios, the allocation layer, the DR baseline method, the digital-twin simulator, step-up MFA, the stage lock                 | They are reasonable but not mandated by anything | Agree on them with your team, and describe them as "we chose X because…"     |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |
| 3     | **Tuning numbers.** Outlook thresholds (10%/40%), minimum group size of 5, token lifetimes, retention periods, scenario counts                                                                              | These are starting values, not results           | Treat them as config and justify them later with data                        |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |
| 4     | **Facts I flagged as unverified.** TimescaleDB on Supabase, the ±6% LV limit for your state, SMS template registration, DPDP Act applicability, dataset licences, Open-Meteo commercial terms, current URLs | I haven't checked these against live sources     | Open each source before it goes into a submission                            |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |
| 5     | **Model performance.** Nothing says M1/M2 will beat persistence, or that coverage will land within ±3 points                                                                                                | The plan is a method, not evidence               | Build the baseline and evaluation harness first and see what the numbers say |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |
| 6     | **Synthetic data.** All training and evaluation data is generated and calibrated                                                                                                                            | Load accuracy is not field-verified              | Keep the "synthetic and calibrated" label everywhere                         |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |
| 7     | **Scope against your time.** Three large plans exceed what most hackathon teams can build                                                                                                                   | Over-scoping is the most likely way this fails   | Fix your deadline and team size, then cut to the MVP set                     |
| ---   | ---                                                                                                                                                                                                         | ---                                              | ---                                                                          |