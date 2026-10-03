# WF-01 — LANDING PAGE
## Mohalla Grid — Frontend Design & Implementation Specification

> **Page ID:** WF-01  
> **Page Type:** Public Landing Page  
> **Primary Users:** Public / Judge / Prospective Resident / DISCOM / Operator  
> **Primary Goal:** Introduce Mohalla Grid in seconds, communicate the core problem and solution clearly, and provide clear entry points into the product/demo.

---

# 1. DESIGN DIRECTION

The landing page should feel like a **premium, modern energy-tech product website**, not a conventional SaaS dashboard.

Use the uploaded visual references as the **visual direction**:

- Large, immersive hero imagery/illustration.
- Strong editorial-style headline typography.
- Generous whitespace and clean composition.
- A restrained, sophisticated palette inspired by **energy, nature, electricity and neighbourhoods**.
- Image-led storytelling rather than a screen full of cards.
- Rounded buttons and subtle glass/translucent UI where appropriate.
- Strong contrast between headline and background.
- The page should feel polished enough for a hackathon judge/demo presentation.
- Do **not** copy the reference websites literally. Use their visual language as inspiration and apply it to Mohalla Grid's own identity.

The landing page should communicate:

> **Reliable power, neighbourhood by neighbourhood.**

The overall visual story should connect:

**Neighbourhood → Renewable Energy → Prediction → Flexible Demand → Shared Battery → Reliable Power**

---

# 2. CORE SOURCE REQUIREMENTS

The source wireframe requires the landing page to:

1. Introduce Mohalla Grid.
2. Explain the problem and solution.
3. Provide entry points for different user types.
4. Make the three-stage operating model understandable:
   - ANTICIPATE
   - PROTECT
   - RESTORE
5. Show simulated impact.
6. Make it obvious that impact numbers are simulated.
7. Provide access to the demo.
8. Provide access to the methodology page.
9. Provide four user journeys:
   - Resident
   - Operator
   - DISCOM
   - Cooperative

The page must let a visitor understand the problem within approximately **10 seconds**.

Source: WF-01 specifies the hero, simulated impact, three-stage operating model and four user journeys. 

---

# 3. PAGE STRUCTURE

The page should be a long-form responsive landing page with the following order:

1. Navigation
2. Hero
3. Simulated Impact
4. How It Works
5. Who Uses It?
6. Final CTA / Demo entry
7. Footer

The hero should dominate the first viewport.

---

# 4. NAVIGATION

## Desktop

Use a clean transparent/overlay navigation over the hero.

### Left

**Mohalla Grid logo**

The logo should feel:

- simple
- modern
- energy-related
- trustworthy
- community-oriented

Do not use an overly technical electricity-grid icon.

### Right navigation

Use:

- How it works
- Impact
- Methodology
- Sign in

Optional visual treatment:

- white text when the hero background is dark
- dark text if the hero background is light
- subtle backdrop blur if necessary

### Sign in

Make Sign in visually secondary.

It should not compete with the main hero CTA.

---

# 5. HERO SECTION

## Purpose

The hero must immediately answer:

**What is Mohalla Grid?**

and

**Why should I care?**

---

## Hero layout

Use a **full-width, image-led hero**.

The uploaded references show the desired visual approach:

- large scenic/illustrated background
- strong headline placed over or beside the image
- short supporting paragraph
- one strong CTA
- one secondary CTA
- minimal visual clutter

The Mohalla Grid hero should use an original illustration or high-quality generated visual representing a **modern neighbourhood energy ecosystem**.

### Suggested visual composition

Background scene:

- Indian urban/residential neighbourhood
- rooftops with solar panels
- distribution lines
- community battery
- transformer/substation elements
- subtle renewable-energy cues
- homes and small businesses
- evening/daylight transition or atmospheric sky
- subtle energy-flow visual language

Avoid making it look like a generic rural solar farm.

The scene should communicate **a neighbourhood energy network**, not just renewable generation.

---

# 6. HERO COPY

## Main heading

### Reliable power, neighbourhood by neighbourhood.

This is the primary headline and should be visually dominant.

Use large editorial typography.

Suggested treatment:

- 64–88px desktop
- 42–56px tablet
- 34–42px mobile
- tight line-height
- maximum 2–3 lines depending on viewport

Do not make the heading excessively wide.

---

## Supporting headline

Use:

### Predict. Shift. Store. Protect.

This can appear directly below the main heading or as a smaller eyebrow/secondary statement.

It summarizes the operating model.

---

## Description

Use:

> Predict renewable-energy gaps, coordinate flexible demand, and use shared storage to keep critical loads powered.

Keep the paragraph short.

Do not add technical terms such as:

- LightGBM
- P10/P50/P90
- optimization algorithms
- power-flow equations
- M&V methodology

Those belong deeper in the product.

---

# 7. HERO CTA

Primary CTA:

### Explore the simulation

This is the most important CTA.

It should route the user toward the product/demo experience, ultimately leading toward **Impact Studio / simulation**.

Visual:

- filled button
- rounded corners
- strong contrast
- slightly larger than secondary CTA

---

## Secondary CTA

### See how it works

This should scroll to or navigate toward the **How It Works** section.

Use an outlined/subtle button.

---

# 8. HERO VISUAL DETAILS

The visual should contain subtle storytelling elements.

Possible visual hierarchy:

### Background

Neighbourhood + landscape.

### Midground

- solar rooftops
- transformer
- power lines
- community battery
- small commercial loads

### Foreground

One or two homes/buildings with visible activity.

### Energy visualization

Use extremely subtle animated flows:

**Solar → Battery → Homes**

and optionally:

**Homes → Flexible Demand → Grid**

Do not turn the page into a technical network diagram.

The energy flows should feel atmospheric rather than engineering-heavy.

---

# 9. HERO INTERACTION

Possible subtle animation:

- solar glow changes slightly
- energy flow moves slowly
- clouds move very subtly
- background illustration has gentle parallax
- CTA has a restrained hover interaction

Avoid:

- aggressive animations
- spinning 3D objects
- excessive particle effects
- flashing effects
- distracting counters

The hero must remain calm and premium.

---

# 10. SIMULATED IMPACT SECTION

Immediately after the hero, introduce:

## SIMULATED IMPACT

This section should look like a clean proof/metric band.

### Important rule

Every impact value must visibly be marked:

> **SIMULATED**

Never imply that these are real field results.

This requirement is explicitly stated in WF-01.

---

## Layout

Desktop:

Three large metrics in one horizontal row.

Example:

| Metric | Value | Label |
|---|---:|---|
| Outage exposure | XX hrs | reduction |
| Critical availability | XX% | critical availability |
| Peak demand | XX kW | reduction |

Do not invent final numbers.

Use placeholders until the actual simulation produces validated values.

---

## Visual treatment

Use:

- large numbers
- small labels
- subtle separators
- minimal icons
- clean typography

Avoid dashboard-style dense KPI cards.

This is a marketing/proof section, not the operator dashboard.

---

# 11. HOW IT WORKS

Heading:

## How It Works

Supporting concept:

### Anticipate → Protect → Restore

Create three large visual cards/sections.

Each should feel like part of one continuous process.

---

# 12. CARD 01 — ANTICIPATE

## Label

### 01 — ANTICIPATE

### Core message

Forecast what is likely to happen before the grid becomes stressed.

Show:

- renewable generation
- load
- uncertainty
- possible feeder stress

### Visual concept

Use a visual showing:

**Solar + Load → Forecast → Warning**

Example visual:

A simplified 24-hour curve with a highlighted evening stress period.

Do not overload the card with technical charts.

---

# 13. CARD 02 — PROTECT

## Label

### 02 — PROTECT

### Core message

Coordinate flexible demand, battery capacity and critical loads when stress is expected.

Show:

- demand response
- battery
- critical loads

### Visual concept

Illustrate:

**Flexible loads shift → Battery supports → Critical loads stay powered**

This is the most important operational action stage.

---

# 14. CARD 03 — RESTORE

## Label

### 03 — RESTORE

### Core message

After the stress period, restore normal operation, verify the outcome and settle rewards.

Show:

- normal operation
- verified results
- rewards

### Visual concept

Illustrate:

**Stress period ends → System stabilizes → Results verified → Rewards settled**

---

# 15. HOW-IT-WORKS VISUAL FLOW

On desktop, the three stages can appear as:

```text
ANTICIPATE
     ↓
PROTECT
     ↓
RESTORE
```

or:

```text
ANTICIPATE  →  PROTECT  →  RESTORE
```

Use a continuous visual connector between the three.

The visitor should understand that these are **three stages of one operating loop**, not three unrelated features.

---

# 16. WHO USES IT?

Heading:

## Who Uses It?

Create four audience entry points:

### Resident

For households and small businesses.

Primary message:

> Understand your electricity outlook, protect important loads and participate when flexibility is needed.

CTA:

**Explore Resident**

---

### Operator

For local site/grid operators.

Primary message:

> Monitor the site, coordinate battery and demand response, and manage grid conditions.

CTA:

**Explore Operator**

---

### DISCOM

For distribution utilities.

Primary message:

> Identify feeder stress, coordinate demand response and measure reliability improvement.

CTA:

**Explore DISCOM**

---

### Cooperative

For community governance and shared energy management.

Primary message:

> Manage community rules, finances, participation and fairness.

CTA:

**Explore Cooperative**

---

# 17. USER-JOURNEY ENTRY BEHAVIOUR

Each audience card should lead into the corresponding product journey.

### Resident

→ Resident Today / onboarding

### Operator

→ Operator Site Overview

### DISCOM

→ DISCOM Network Map

### Cooperative

→ Cooperative Governance

The landing page should not require the visitor to understand the entire system before entering a journey.

---

# 18. VISUAL STYLE FOR AUDIENCE CARDS

Use four clean cards.

Each card can contain:

- small icon
- audience name
- one-line description
- subtle illustration
- arrow / Explore action

Do not use four huge dashboard screenshots.

The landing page should remain visually editorial.

---

# 19. FINAL CTA

After the audience section, provide a final conversion/demo section.

Suggested heading:

### See how a neighbourhood responds before the grid is under stress.

Supporting text:

> Explore the simulation and see how forecasting, demand response and shared storage work together to protect critical loads.

Primary CTA:

### Explore the simulation

Secondary:

### View methodology

---

# 20. FOOTER

Minimal footer.

Include:

### Mohalla Grid

Short descriptor:

> Neighbourhood intelligence for more reliable, flexible electricity.

Links:

- How it works
- Impact
- Methodology
- Resident
- Operator
- DISCOM
- Cooperative

Legal/utility links can be added later.

---

# 21. RESPONSIVE DESIGN

## Desktop

Use the full visual composition.

Hero:

- full viewport or approximately 80–90vh
- text anchored toward the left
- visual dominates the background
- navigation overlays hero

How It Works:

Three columns.

Who Uses It:

Four columns or 2×2 grid.

---

## Tablet

Hero:

- reduce headline size
- preserve image
- move text slightly upward/left
- maintain clear CTA hierarchy

How It Works:

Three cards can remain horizontal if space allows.

Audience cards:

2×2.

---

## Mobile

Hero should become a vertical composition.

Order:

1. Logo/navigation
2. Hero visual
3. Headline
4. Supporting text
5. Primary CTA
6. Secondary CTA

Do not make the background image so busy that the headline becomes unreadable.

How It Works:

Stack cards vertically.

Who Uses It:

Stack cards vertically.

---

# 22. TYPOGRAPHY

The visual references suggest an **editorial / premium display typography** direction.

Use:

### Display font

A refined serif or expressive display font for major marketing headlines.

### Body font

A clean modern sans-serif.

The contrast between display headline and functional body text should make the page feel premium.

Avoid overly futuristic fonts.

Avoid default generic SaaS typography.

---

# 23. COLOUR DIRECTION

Primary visual direction:

- deep forest / energy green
- muted teal
- warm off-white
- soft cream
- charcoal
- restrained electric blue accents

Optional accent:

- amber/yellow for warning or energy-state moments

Use status colors only where semantically necessary.

The landing page should not look like a warning dashboard.

---

# 24. IMAGE / ILLUSTRATION DIRECTION

The uploaded references demonstrate three useful qualities:

### Reference 1

Large illustrated landscape + strong headline overlay.

Use this approach for:

**Mohalla Grid's neighbourhood energy hero.**

### Reference 2

Illustrated lifestyle/environment scene with a clean marketing headline.

Use this approach for:

**community + human context.**

### Reference 3

Minimal premium typography + atmospheric natural landscape.

Use this approach for:

**calm, trustworthy visual hierarchy and generous whitespace.**

Combine these principles rather than reproducing any one reference.

---

# 25. WHAT NOT TO DO

Do NOT create:

- a generic blue SaaS landing page
- a dashboard as the homepage
- a hero filled with charts
- excessive glassmorphism
- excessive gradients
- excessive neon
- dozens of icons
- technical equations above the fold
- dense navigation
- fake real-world impact claims
- fabricated statistics
- unsupported performance claims

The page should feel like a **real energy product**, not an academic project dashboard.

---

# 26. DATA / CLAIM RULES

Use only validated values.

If a value is generated by the prototype:

> **SIMULATED**

If it comes from an observed source:

> **OBSERVED**

If it comes from a predictive model:

> **FORECAST**

Do not mix these categories.

This distinction is fundamental to the overall product design.

---

# 27. ACCESSIBILITY

Ensure:

- strong text/background contrast
- keyboard-accessible navigation
- visible focus states
- buttons have clear labels
- images have meaningful alt text
- animations can be reduced
- status is not communicated through colour alone

---

# 28. MOTION

Motion should communicate system behaviour.

Use:

- gentle entrance animations
- slow energy-flow animation
- subtle image parallax
- smooth section transitions
- restrained button hover states

Avoid:

- bouncing cards
- excessive scroll effects
- rapid animations
- decorative motion with no meaning

---

# 29. COMPONENTS REQUIRED

Build reusable components:

```text
Navbar
HeroSection
HeroBackground
PrimaryCTA
SecondaryCTA
SimulatedImpact
ImpactMetric
HowItWorks
StageCard
StageConnector
AudienceSection
AudienceCard
FinalCTA
Footer
SimulationBadge
```

---

# 30. KEY INTERACTION PATHS

The landing page must provide these paths:

```text
Landing
   │
   ├── Explore the simulation
   │       ↓
   │   Impact / Simulation experience
   │
   ├── See how it works
   │       ↓
   │   How It Works section
   │
   ├── Methodology
   │       ↓
   │   WF-02
   │
   ├── Resident
   │       ↓
   │   Resident journey
   │
   ├── Operator
   │       ↓
   │   WF-20
   │
   ├── DISCOM
   │       ↓
   │   WF-40
   │
   └── Cooperative
           ↓
       WF-30
```

---

# 31. JUDGE EXPERIENCE

The first 10 seconds should communicate:

### 1. The problem

Neighbourhood electricity can become stressed because renewable generation, demand and grid conditions vary.

### 2. The solution

Mohalla Grid predicts stress and coordinates demand, storage and critical loads.

### 3. The mechanism

**Anticipate → Protect → Restore**

### 4. The proof

The visitor can enter the simulation and compare outcomes.

Do not force the judge to read paragraphs to understand the product.

---

# 32. ACCEPTANCE CRITERIA

The page is complete only when:

- [ ] Visitor understands the problem within approximately 10 seconds.
- [ ] Visitor understands what Mohalla Grid does.
- [ ] Hero clearly communicates the product.
- [ ] Primary CTA leads to the simulation.
- [ ] Secondary CTA reaches How It Works.
- [ ] Anticipate / Protect / Restore are clearly explained.
- [ ] Simulated impact metrics are visibly labelled.
- [ ] Resident journey is accessible.
- [ ] Operator journey is accessible.
- [ ] DISCOM journey is accessible.
- [ ] Cooperative journey is accessible.
- [ ] Methodology page is accessible.
- [ ] Mobile layout remains clear.
- [ ] The page does not look like a generic dashboard.
- [ ] No unsupported real-world claims are presented.

---

# 33. FINAL DESIGN PRINCIPLE

The landing page should tell one simple story:

> **A neighbourhood can anticipate electricity stress, protect what matters, and restore normal operation — with Mohalla Grid coordinating the intelligence behind it.**

The page should feel **calm, human, premium, trustworthy and visually memorable**.

The visual references are inspiration for the composition and atmosphere; the actual content, structure and interactions must remain specific to Mohalla Grid and WF-01.
