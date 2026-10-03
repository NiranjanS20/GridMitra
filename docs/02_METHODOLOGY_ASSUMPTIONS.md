# WF-02 — METHODOLOGY & ASSUMPTIONS

**Role / audience:** Public / transparency

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


Purpose: make the forecasting and simulation credible by clearly showing data, models, assumptions and limitations.

### Layout
1. Editorial hero: **How Mohalla Grid works**
2. Horizontal process: **Data → Forecast → Scenario → Optimization → Power Flow → Verification**
3. Data source cards/table
4. Model cards
5. Assumptions
6. Limitations
7. Link back to Impact Studio and the relevant evidence.

### Data cards
Every dataset card must expose: Source, Purpose, Resolution, Coverage, Pre-processing, Known limitations, Last updated.

### Model cards
Show model name, horizon, resolution, outputs and inputs. For the documented load-forecast example use **LightGBM Quantile**, 24-hour horizon, 15-minute resolution and P10/P50/P90 outputs.

### Critical distinction
Use unmistakable badges:
- **OBSERVED**
- **FORECAST**
- **SIMULATED**

### Connected actions
- From Impact Studio → open the relevant methodology section.
- From methodology → return to Impact Studio.
- From public navigation → Methodology.


---

## Implementation notes

- Preserve the page ID (`WF-02`) in developer-facing route metadata.
- Use real data when available; otherwise use clearly labelled prototype/simulated data.
- Do not invent field results, prices, reliability improvements, or model performance.
- Keep the page visually consistent with WF-01 while adapting density to the user's role.
