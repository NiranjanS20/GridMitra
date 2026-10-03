# WF-14 — SHIFT & EARN

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


Purpose: let residents participate in demand response without making participation coercive.

### Offer card
Show:
**SHIFT & EARN**
Water pump
Current: 3:00 PM
Suggested: 4:00 PM
Duration: 30 minutes
Reward: +12 credits

Actions:
- Accept
- Decline
- Why?

### Critical rule
**Declining must not punish the resident.**

### Why interaction
Explain:
- why the shift is requested
- expected grid/community benefit
- requested duration
- reward logic

### History / measurement & verification
Show event history:
Requested → Verified → Reward.

Example structure:
Oct 02
Requested: 0.8 kW
Verified: 0.7 kW
Reward: +18 credits

### Connected journey
WF-12 identifies a potential gap → WF-14 proposes a shift → Accept → event occurs → verification → credits update in WF-16 → contribution appears in WF-17.


---

## Implementation notes

- Preserve the page ID (`WF-14`) in developer-facing route metadata.
- Use real data when available; otherwise use clearly labelled prototype/simulated data.
- Do not invent field results, prices, reliability improvements, or model performance.
- Keep the page visually consistent with WF-01 while adapting density to the user's role.
