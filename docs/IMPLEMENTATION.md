# MOHALLA GRID — IMPLEMENTATION.md

> Master implementation guide for building the complete Mohalla Grid web experience from the PRD, 32 page-wise specifications, navigation manifest, and installed Antigravity/GSD/design skills.

---

# 1. OBJECTIVE

Build **Mohalla Grid** as one coherent, polished, connected energy-intelligence product.

The implementation must not behave like 32 unrelated mockup pages.

The product must communicate one continuous story:

**Forecast → Warning → Demand Response → Battery → Feeder Protection → Measured Result**

The implementation should combine:

- premium renewable-energy visual design
- role-based experiences
- connected navigation
- shared components
- consistent mock data/state
- responsive layouts
- accessible interactions
- credible simulation labeling
- clear evidence and traceability

The existing `/docs` directory is the primary product specification.

---

# 2. SOURCE-OF-TRUTH ORDER

Use the following priority:

1. `docs/prd.md`
2. `docs/00_NAVIGATION_MANIFEST.md`
3. Individual `docs/WF/page` specifications
4. Existing project architecture
5. Installed skills
6. Supplied visual references
7. Implementation judgement

Do not invent functionality that conflicts with the PRD or page specifications.

If something is unspecified, make the smallest reasonable decision needed to produce a coherent implementation.

---

# 3. EXISTING DOCUMENTATION

The implementation must account for all 32 product screens:

## Public

- WF-01 Landing
- WF-02 Methodology & Assumptions

## Resident

- WF-10 Onboarding
- WF-11 Today
- WF-12 Outlook
- WF-13 My Loads & Priorities
- WF-14 Shift & Earn
- WF-15 Community Battery
- WF-16 Wallet & Billing
- WF-17 My Impact
- WF-18 Settings & Privacy
- WF-19 WhatsApp / SMS / IVR

## Operator

- WF-20 Site Overview
- WF-21 Dispatch & Controls
- WF-22 Forecast Lab
- WF-23 Members & Tiers
- WF-24 Battery Health
- WF-25 Fairness & Access
- WF-26 Maintenance & Tickets
- WF-27 Devices & Data Sources

## Cooperative

- WF-30 Governance
- WF-31 Finance
- WF-32 Community Health

## DISCOM

- WF-40 Network Map
- WF-41 Feeder Detail
- WF-42 DR Center
- WF-43 Analytics & Reports
- WF-44 Integrations

## Admin / Auditor / Impact

- WF-50 Tenants, Users & Roles
- WF-51 Model Registry
- WF-52 Audit Log
- WF-53 Impact Studio

---

# 4. IMPLEMENTATION STRATEGY

Do not implement everything in one unstructured pass.

Use these phases.

## Phase 0 — Repository audit

Before coding:

- inspect repository
- inspect package manager
- inspect framework
- inspect `package.json`
- inspect existing routes
- inspect existing components
- inspect global CSS/theme
- inspect existing state management
- inspect existing assets
- inspect existing environment configuration
- inspect installed skills

Do not replace an existing architecture without a concrete reason.

---

# 5. PHASE 1 — FOUNDATION

Create the product foundation before building the pages.

Implement:

- application shell
- routing
- design tokens
- typography
- colour system
- spacing system
- radius system
- shadows
- responsive breakpoints
- shared layout primitives
- navigation
- sidebar
- mobile navigation
- page header
- breadcrumbs
- common cards
- buttons
- badges
- drawers
- modals
- tables
- charts
- loading/error/empty states

The goal is to ensure all later pages are built from one visual system.

---

# 6. DESIGN SYSTEM

## Visual direction

The supplied renewable-energy references establish the desired direction.

The product should feel:

- premium
- editorial
- renewable-energy focused
- trustworthy
- human
- sophisticated
- modern
- calm

It should not feel like:

- generic SaaS
- an admin template
- a cryptocurrency dashboard
- a neon futuristic interface
- an academic prototype

---

# 7. DESIGN TOKENS

Create centralized design tokens.

Suggested conceptual tokens:

```text
--color-forest
--color-forest-deep
--color-teal
--color-cream
--color-paper
--color-charcoal
--color-lime
--color-warning
--color-critical
--color-restore
```

Also centralize:

```text
--font-display
--font-body

--space-xs
--space-sm
--space-md
--space-lg
--space-xl
--space-2xl

--radius-sm
--radius-md
--radius-lg
--radius-xl

--shadow-sm
--shadow-md
--shadow-lg
```

Do not repeatedly hard-code identical values inside individual pages.

---

# 8. TYPOGRAPHY

Use two complementary type systems.

## Display

For:

- landing hero
- major section headings
- Impact Studio
- important editorial statements

Use a refined editorial/display typeface.

## UI

For:

- navigation
- body text
- tables
- controls
- charts
- technical data

Use a clean modern sans-serif.

The contrast should make the product feel like a premium energy platform.

---

# 9. COLOUR SYSTEM

Primary:

- deep forest green
- muted teal
- warm cream
- off-white
- charcoal
- restrained lime/electric green

Warning:

- amber/orange

Critical:

- red

Restore:

- blue

Important:

**Never use colour as the only indicator of state.**

Every state must have:

- text
- icon or symbol
- colour

---

# 10. ROUTING ARCHITECTURE

Use semantic role-based routes.

Suggested route structure:

```text
/
 /methodology

/resident/onboarding
/resident/today
/resident/outlook
/resident/loads
/resident/shift
/resident/battery
/resident/wallet
/resident/impact
/resident/settings
/resident/communications

/operator
/operator/dispatch
/operator/forecast
/operator/members
/operator/battery
/operator/fairness
/operator/tickets
/operator/devices

/cooperative
/cooperative/finance
/cooperative/health

/discom
/discom/feeder
/discom/dr
/discom/analytics
/discom/integrations

/admin/users
/admin/models
/admin/audit

/impact
```

Use route aliases if necessary, but keep route names understandable.

---

# 11. ROLE-BASED APP SHELLS

Do not use one identical shell for every role.

## Public

Marketing/navigation shell.

## Resident

Mobile-first app shell.

Bottom navigation:

```text
Today
Outlook
Loads
Earn
Me
```

## Operator

Desktop control-room shell.

Sidebar:

```text
Overview
Dispatch
Forecast
Members
Battery
Fairness
Tickets
Devices
```

## Cooperative

Community/governance shell.

## DISCOM

Infrastructure/network shell.

## Admin

Precise administrative shell.

## Impact Studio

Presentation/demo shell.

---

# 12. SHARED COMPONENT ARCHITECTURE

Build reusable components.

Recommended component groups:

## Layout

```text
AppShell
PublicShell
RoleShell
Sidebar
MobileNav
PageHeader
Breadcrumbs
Section
Container
```

## Navigation

```text
Navbar
NavItem
SidebarItem
BottomNav
RoleSwitcher
```

## Content

```text
Card
MetricCard
KpiCard
InfoCard
FeatureCard
StatusCard
```

## Feedback

```text
StatusBadge
SimulationBadge
ObservedBadge
ForecastBadge
Alert
Toast
EmptyState
LoadingState
ErrorState
```

## Interaction

```text
Modal
Drawer
BottomSheet
ConfirmationModal
Tooltip
Popover
Dropdown
Tabs
```

## Data

```text
DataTable
FilterBar
Timeline
ActivityTimeline
ChartCard
```

## Energy-specific

```text
BatteryVisualization
SingleLineDiagram
FeederMap
ForecastChart
AllocationRing
BeforeAfterComparison
ScenarioSelector
DrEventCard
```

---

# 13. DATA ARCHITECTURE

If a backend is not available, use a centralized mock-data layer.

Do not hard-code values independently in each component.

Create domain modules for:

```text
residents
loads
forecasts
battery
feeders
transformers
drEvents
allocations
credits
tickets
devices
models
auditEvents
scenarios
impactMetrics
```

Example:

```text
mock/
├── residents
├── loads
├── forecasts
├── battery
├── feeders
├── dr-events
├── allocations
├── tickets
├── devices
├── models
├── audit
└── scenarios
```

---

# 14. DATA CONSISTENCY

Connected pages must use the same underlying mock entities.

Example:

If WF-20 shows battery SOC = 72%:

- WF-24 should reflect the same state unless a deliberate transition occurred.
- WF-15 should use the same battery state where relevant.
- WF-53 should use scenario-specific battery behavior rather than a contradictory arbitrary value.

If a resident accepts a DR event in WF-14:

The event must appear consistently in:

- verification
- credits
- My Impact
- relevant operator/discom views

---

# 15. APPLICATION STATE

Use centralized state only where cross-page consistency requires it.

Suggested state domains:

```text
app
auth/demo
resident
operator
cooperative
discom
admin
simulation
```

Important resident state:

```text
selectedLoads
reliabilityTier
drParticipation
credits
batteryAllocation
notificationPreferences
```

Important operator state:

```text
batteryState
dispatchPlan
alerts
deviceStatus
overrides
```

Important DISCOM state:

```text
selectedFeeder
riskState
drRequests
verificationResults
```

Important simulation state:

```text
selectedScenario
baselineMetrics
solutionMetrics
simulationTimestamp
methodologyVersion
```

---

# 16. DEMO MODE

Implement a practical demo mode if real authentication is not available.

Allow entry into:

```text
Resident Demo
Operator Demo
Cooperative Demo
DISCOM Demo
Admin Demo
```

The demo mode should not require real user accounts unless explicitly required by the PRD.

Persist the selected role during the demo session.

Provide a clear way to switch roles during judging.

---

# 17. PUBLIC IMPLEMENTATION

## WF-01

Build the premium editorial landing page.

Hero:

```text
Reliable power,
neighbourhood by neighbourhood.

Predict. Shift. Store. Protect.
```

Primary CTA:

```text
Explore the simulation
```

Secondary:

```text
See how it works
```

Sections:

```text
Hero
↓
Simulated Impact
↓
How It Works
↓
Who Uses It?
↓
Final CTA
↓
Footer
```

Connect:

```text
Explore Simulation → /impact
Methodology → /methodology
Resident → /resident/onboarding
Operator → /operator
Cooperative → /cooperative
DISCOM → /discom
```

---

# 18. WF-02 IMPLEMENTATION

Methodology should visually explain:

```text
Data
→ Forecast
→ Scenario
→ Optimization
→ Power Flow
→ Verification
```

Use:

- data cards
- model cards
- assumptions
- limitations

Always distinguish:

```text
OBSERVED
FORECAST
SIMULATED
```

---

# 19. RESIDENT IMPLEMENTATION

## WF-10

Flow:

```text
Welcome
→ User Type
→ Reliability Tier
→ Loads
→ Consent
→ WF-11
```

Store onboarding selections.

## WF-11

Primary resident home.

Must answer:

```text
What is going to happen?
What should I do?
What is protected?
```

## WF-12

Forecast visualization.

Interaction:

```text
Tap time point
→ Why drawer
→ Evidence / Methodology
```

## WF-13

Manage load priority.

Changes must update resident state.

## WF-14

Demand-response offer.

Flow:

```text
Offer
→ Accept/Decline
→ Event
→ Verification
→ Credits
→ Impact
```

Declining must not punish the resident.

## WF-15

Community battery.

Show:

```text
SOC
Available to you
Fair-share
Recent allocation
```

Never expose another resident's private consumption.

## WF-16

Wallet.

Show:

```text
Balance
Credits
Plan
Payments
Invoices
```

Do not invent pricing.

## WF-17

Resident impact.

Show:

```text
Protected hours
Energy shifted
Credits earned
Outage exposure avoided
```

## WF-18

Settings and privacy.

## WF-19

Communication-channel demonstration.

---

# 20. OPERATOR IMPLEMENTATION

## WF-20

Primary control room.

Main visual:

```text
Grid
→ Transformer
→ Loads
      ↑
PV + Battery
```

Use an interactive single-line diagram.

Support:

- dispatch timeline
- next four hours
- alerts
- energy/data/money toggle
- override

## WF-21

Dispatch.

Override must require:

```text
Reason
Duration
```

Every confirmed override creates an audit event.

## WF-22

Forecast Lab.

Charts:

- load observed vs forecast
- PV observed vs forecast
- P10/P50/P90
- forecast error
- model health

## WF-23

Members.

Restrict unauthorized household data.

## WF-24

Battery health.

## WF-25

Fairness.

## WF-26

Maintenance/tickets.

## WF-27

Devices/data sources and observability ladder.

---

# 21. COOPERATIVE IMPLEMENTATION

## WF-30

Governance:

```text
Rules
Proposals
Voting
```

## WF-31

Finance:

```text
Revenue
Operating costs
Net
Sankey
Unit economics
```

## WF-32

Community health:

```text
Members
Participation
Fairness
Protected hours
```

---

# 22. DISCOM IMPLEMENTATION

## WF-40

Three-column hero:

```text
Filters | Network Map | At Risk
```

States:

```text
Steady
Watch
Tight
Critical
```

Clicking a feeder routes to WF-41.

## WF-41

Feeder detail.

Show:

- loading
- predicted violations
- voltage profile
- peak load
- PV
- battery
- losses
- violations

## WF-42

DR Center.

Flow:

```text
Feeder stress
→ DR request
→ accepted response
→ actual
→ verified
```

## WF-43

Analytics and reports.

Exports must include:

- period
- data source
- methodology version
- simulated/field designation

## WF-44

Integrations:

- ADMS
- DERMS
- API keys
- alert rules

---

# 23. ADMIN IMPLEMENTATION

## WF-50

Users, tenants and roles.

Role permissions must be visible before assignment.

## WF-51

Model registry.

Every model version must be traceable.

## WF-52

Audit log.

This page must be:

**trustworthy, precise and intentionally boring.**

Do not make it flashy.

## WF-53

Impact Studio.

This is the primary proof/demo screen.

Flow:

```text
Scenario
↓
Baseline
↓
Mohalla Grid intervention
↓
Before / After
↓
Impact KPIs
↓
Why did this change?
↓
Methodology
```

Scenarios:

```text
Cloudy Week
Heatwave
4-hour Grid Loss
```

Always show:

```text
SIMULATED RESULTS — NOT FIELD RESULTS
```

---

# 24. CORE ENERGY FLOW

The implementation should make the system feel causally connected.

Example:

```text
Forecast detects evening stress
        ↓
Resident receives recommendation
        ↓
Flexible load is shifted
        ↓
Battery supports critical loads
        ↓
Feeder stress reduces
        ↓
DR response is measured
        ↓
Result is verified
        ↓
Resident receives credits
        ↓
Impact is shown
```

This same event should be represented consistently across role views.

---

# 25. INTERACTION RULES

Every interactive element should have a meaningful result.

Examples:

### Forecast point

```text
click
→ Why drawer
```

### Feeder

```text
click
→ Feeder detail
```

### Battery

```text
click
→ Battery state
```

### DR

```text
click
→ Request / verification
```

### Override

```text
confirm
→ system state update
→ audit entry
```

### DR acceptance

```text
accept
→ event created
→ verification
→ credits
→ impact
```

Do not create decorative interactions that do not affect state or navigation.

---

# 26. RESPONSIVE IMPLEMENTATION

## Marketing/public

Desktop and mobile optimized.

## Resident

Mobile-first.

## Operator

Desktop-first.

## DISCOM

Desktop-first.

## Admin

Desktop-first.

For mobile:

- collapse sidebars
- use bottom navigation where appropriate
- use drawers/bottom sheets
- stack cards
- simplify charts
- maintain touch targets
- preserve information hierarchy

Do not simply scale desktop layouts down.

---

# 27. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- focus states
- accessible labels
- accessible forms
- alt text
- colour contrast
- reduced motion
- status text alongside colour
- chart labels/tooltips
- touch-friendly controls

---

# 28. PERFORMANCE

Optimize:

- images
- fonts
- charts
- route loading
- below-fold sections

Use lazy loading where appropriate.

Do not add unnecessary packages.

Avoid rendering expensive charts when not visible.

---

# 29. IMPLEMENTATION PHASE ORDER

## Phase 1

Foundation:

- design system
- routing
- shared components
- app shells
- mock data
- state

## Phase 2

Public:

- WF-01
- WF-02

## Phase 3

Resident:

- WF-10
- WF-11
- WF-12
- WF-13
- WF-14
- WF-15
- WF-16
- WF-17
- WF-18
- WF-19

## Phase 4

Operator:

- WF-20
- WF-21
- WF-22
- WF-23
- WF-24
- WF-25
- WF-26
- WF-27

## Phase 5

Cooperative:

- WF-30
- WF-31
- WF-32

## Phase 6

DISCOM:

- WF-40
- WF-41
- WF-42
- WF-43
- WF-44

## Phase 7

Admin / Impact:

- WF-50
- WF-51
- WF-52
- WF-53

## Phase 8

Integration:

- shared state
- navigation
- event propagation
- demo flows
- role switching

## Phase 9

QA:

- responsive
- accessibility
- visual consistency
- interaction consistency
- performance

---

# 30. P0 SCREENS

The following should receive the highest implementation quality:

```text
WF-11 Resident Today
WF-12 Resident Outlook
WF-20 Operator Site Overview
WF-40 DISCOM Network Map
WF-41 Feeder Detail
WF-42 DR Center
WF-53 Impact Studio
```

These screens form the strongest end-to-end demonstration.

---

# 31. P0 SHARED COMPONENTS

Prioritize:

```text
Status Banner
Forecast Chart
KPI Cards
Single-Line Diagram
Feeder Map
DR M&V
Baseline / Solution Comparison
Simulation Badge
```

These components should look highly polished.

---

# 32. VALIDATION

After every phase:

1. Start the app.
2. Navigate through the implemented flow.
3. Check console errors.
4. Check routing.
5. Check responsive behavior.
6. Check visual consistency.
7. Check data consistency.
8. Check interactive state.
9. Check accessibility.
10. Compare implementation against the corresponding MD file.

Do not assume that a successful build means the feature is complete.

---

# 33. PAGE COMPLETION CHECKLIST

For every WF page:

```text
[ ] Route exists
[ ] Page renders
[ ] Correct role shell
[ ] Correct page title
[ ] Required sections implemented
[ ] Required interactions implemented
[ ] Connected navigation implemented
[ ] Mock data connected
[ ] Loading state
[ ] Empty state where applicable
[ ] Error state where applicable
[ ] Responsive
[ ] Accessible
[ ] Visual system consistent
[ ] Observed/Forecast/Simulated distinction correct
```

---

# 34. CROSS-PAGE TESTING

Test these complete journeys.

## Journey A — Resident

```text
Landing
→ Resident
→ Onboarding
→ Today
→ Outlook
→ Why
→ Shift & Earn
→ Accept
→ Verification
→ Credits
→ My Impact
```

## Journey B — Operator

```text
Landing
→ Operator
→ Site Overview
→ Dispatch
→ Override
→ Audit Log
→ Battery
→ Forecast
```

## Journey C — DISCOM

```text
Landing
→ DISCOM
→ Network Map
→ Feeder
→ DR Center
→ M&V
→ Analytics
→ Impact Studio
```

## Journey D — Cooperative

```text
Landing
→ Cooperative
→ Governance
→ Finance
→ Community Health
```

## Journey E — Judge / Demo

```text
Landing
→ Explore Simulation
→ Impact Studio
→ Scenario
→ Baseline
→ Mohalla Grid
→ Before / After
→ Impact KPIs
→ Why did this change?
→ Methodology
```

---

# 35. VISUAL QA

Perform actual browser-based visual inspection.

Check:

### Landing

- hero composition
- headline hierarchy
- image quality
- CTA visibility
- section transitions
- mobile composition

### Resident

- mobile readability
- status clarity
- chart legibility
- bottom navigation

### Operator

- information density
- single-line diagram
- alert hierarchy
- table readability

### DISCOM

- map clarity
- filter hierarchy
- risk states
- feeder detail

### Admin

- table density
- audit readability
- permission clarity

### Impact Studio

- scenario selection
- before/after comparison
- KPI hierarchy
- simulation disclaimer
- presentation quality

---

# 36. CONTENT RULES

Do not fabricate:

- real-world field results
- real utility customers
- real prices
- real reliability improvements
- unsupported model performance
- real deployment claims

Use:

```text
X
XX%
₹____
...
```

where the specification intentionally leaves a value unresolved.

If synthetic/demo data is necessary:

label it appropriately.

---

# 37. SECURITY / PRIVACY

Do not expose:

- another resident's private consumption
- unmasked API keys
- unauthorized household-level data

Role permissions must be respected at the UI level and, where a backend exists, at the data-access level.

---

# 38. CODE QUALITY

Keep the code modular.

Prefer:

```text
features/
components/
layouts/
routes/
data/
state/
styles/
utils/
```

or adapt to the project's existing architecture.

Avoid:

- giant page components
- repeated JSX
- duplicated styling
- duplicated mock data
- hard-coded navigation
- hard-coded values scattered across files

---

# 39. FINAL BUILD REQUIREMENT

The final implementation should feel like one product.

A visitor should be able to move naturally between:

```text
Public story
→ Resident experience
→ Operational control
→ Utility intelligence
→ Community governance
→ Administrative evidence
→ Impact proof
```

The UI should change density and interaction style by role, but the visual identity should remain unmistakably Mohalla Grid.

---

# 40. FINAL PRODUCT STORY

The final application must make this sequence understandable without explanation:

**ANTICIPATE**

Predict renewable generation, demand and possible feeder stress.

↓

**PROTECT**

Coordinate flexible demand, battery capacity and critical loads.

↓

**RESTORE**

Return to normal operation, verify the result and settle rewards.

↓

**PROVE**

Use measured/simulated evidence to show what changed.

---

# 41. DEFINITION OF DONE

The project is considered implementation-complete only when:

- all 32 WF routes exist
- all 32 pages follow their corresponding MD specification
- navigation connects the product
- role-based shells work
- shared design system is used
- shared mock data/state is consistent
- primary interactions work
- P0 screens are polished
- responsive layouts work
- accessibility basics work
- simulated data is clearly labelled
- no unsupported claims are presented
- build/checks pass
- browser visual QA has been performed
- major user journeys can be completed without dead ends

The final experience must tell one coherent story:

**Forecast → Warning → Demand Response → Battery → Feeder Protection → Measured Result.**
