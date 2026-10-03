# WF-11 — RESIDENT TODAY

**Role / audience:** Resident

## Shared visual language — apply to every page

Use the supplied renewable-energy references as the visual direction, not as literal copies.

- **Overall feel:** premium renewable-energy / climate-tech product, editorial rather than generic SaaS.
- **Palette:** deep forest green, muted teal, warm cream/off-white, charcoal, restrained lime/electric-green accents; amber/orange only for warning states.
- **Typography:** expressive editorial/display face for major headings + clean modern sans-serif for UI/data.
- **Surfaces:** warm cream content surfaces, deep-green section bands, generous whitespace, rounded cards, thin borders, soft shadows.
- **Photography/illustration:** renewable-energy landscapes, neighbourhoods, rooftops, solar, batteries, substations, people and utility infrastructure. Use large image crops with subtle overlays rather than tiny decorative thumbnails.
- **Charts:** clean, editorial charts with restrained gridlines and strong annotation. Avoid dashboard clutter.
- **Status:** never communicate state by colour alone; pair colour with labels/icons.
- **Motion:** subtle reveal, smooth transitions, gentle energy-flow animations. Avoid excessive particles/neon/glassmorphism.
- **Responsive:** desktop-first composition with deliberate mobile stacking; never simply shrink a desktop dashboard.
- **Trust:** observed / forecast / simulated must remain visually distinct throughout the product.

## Product-wide navigation rule

Every authenticated/product page should retain a consistent role-aware navigation shell. The active page is visually highlighted, and related pages are reachable without forcing the user back to the landing page.

Use contextual breadcrumbs where useful:

**Role → Current page → Detail / action**

Every detail drawer/modal must provide a clear close/return path. Actions that change state must preserve the user's current context.

## Source-of-truth interaction principle

Every page follows:

**GLANCE → EXPLAIN → EVIDENCE**

Tell me what is happening → tell me why → show me the data proving it.

Never replace plain-language meaning with raw model terminology.


Purpose: the primary resident home/dashboard. It must answer immediately: **What is going to happen? What should I do?**

### First viewport
A calm, mobile-first composition with:
1. Stage banner
2. 24-hour outlook strip
3. Do This Now card
4. Protected loads
5. Community battery
6. Credits
7. Bottom navigation

### Stage banner
Possible states:
- 🟢 ANTICIPATE
- 🟠 PROTECT
- 🔵 RESTORE

Example message:
**Power may be tight 7–9 PM.**

### Today outlook
Show a compact 24-hour state strip. The user should be able to tap through to **WF-12 Outlook**.

### Do This Now
Example:
**Run your water pump before 4 PM and earn credits.**
Actions:
- Do it now
- Why?

### Protected
Show selected critical/priority loads, linked to **WF-13 My Loads & Priorities**.

### Community battery
Show current availability, linked to **WF-15 Community Battery**.

### Credits
Show balance, linked to **WF-16 Wallet & Billing**.

### Bottom navigation
Today → WF-11
Outlook → WF-12
Loads → WF-13
Earn → WF-14
Me → WF-15 / WF-16 / WF-17 / WF-18 / WF-19

### Visual direction
This should feel like a premium energy companion, not a utility billing dashboard: warm cream background, deep-green typography, one strong state accent, large whitespace.


---

## Implementation notes

- Preserve the page ID (`WF-11`) in developer-facing route metadata.
- Use real data when available; otherwise use clearly labelled prototype/simulated data.
- Do not invent field results, prices, reliability improvements, or model performance.
- Keep the page visually consistent with WF-01 while adapting density to the user's role.
