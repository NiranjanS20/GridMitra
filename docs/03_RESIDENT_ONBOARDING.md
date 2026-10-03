# WF-10 — RESIDENT ONBOARDING

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


Purpose: create a resident profile and configure participation before entering the resident experience.

### Flow
**Welcome → User type → Reliability tier → Loads → Consent → Resident Today**

### Screen 1 — Welcome
Headline: **Make your neighbourhood's power more dependable.**
Fields/actions:
- Language selector
- Mobile number
- Continue

### Screen 2 — User type
Two choices:
- Household
- Small business

### Screen 3 — Reliability preference
- Essential — keep critical loads protected.
- Standard — protect essential + selected loads.

Do not hard-code prices unless the economics model provides them.

### Screen 4 — Loads
Allow the user to select what stays on first:
- Refrigerator
- Medical device
- Lights
- Water pump
- AC

### Screen 5 — Consent
Clearly show:
- data collected
- purpose
- who can access it
- retention
- consent

### Connected behavior
After consent, route to **WF-11 Resident Today**. The selected loads become the resident's priorities in **WF-13**, and participation preferences feed **WF-14 Shift & Earn**.


---

## Implementation notes

- Preserve the page ID (`WF-10`) in developer-facing route metadata.
- Use real data when available; otherwise use clearly labelled prototype/simulated data.
- Do not invent field results, prices, reliability improvements, or model performance.
- Keep the page visually consistent with WF-01 while adapting density to the user's role.
