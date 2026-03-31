# plantPunkOS

A plant encyclopedia that catalogs houseplants with their care requirements, helping plant lovers find the right info for their green friends.

## Project Structure

- `plantpunk-web/` — Next.js 15 + Payload CMS (frontend + admin + API)

## Tech Stack

**Frontend:** Next.js 15, TypeScript, SCSS (BEM + CSS Modules)
**CMS:** Payload CMS 3, PostgreSQL
**Future:** Laravel worker service for background jobs (care reminders, notifications, Trefle sync)

## Getting Started

### Prerequisites
- Node.js >= 20
- Docker

### Setup

```bash
cd plantpunk-web

# Start the database
docker compose up -d

# Install dependencies
npm install

# Start the dev server
npm run dev
```

App runs at `http://localhost:3000`, admin panel at `http://localhost:3000/admin`.

### Database

```bash
# Export
docker compose exec database pg_dump -U postgres plantpunk > backup.sql

# Import
docker compose exec -T database psql -U postgres plantpunk < backup.sql
```

## v1 Scope

### Data Model
- **Plant** — name, scientific name, slug, description, image, care info (light, watering, humidity, difficulty, substrate, temperature range), tips, toxicity
- **Category** — plant families (e.g. Araceae, Cactaceae) — one-to-many with Plant
- **Tag** — traits like trailing, variegated, pet-safe — many-to-many with Plant
- **Enums** — Light, Watering, Humidity, Difficulty

### Frontend
- Server-side rendered plant listing and detail pages
- SCSS with BEM naming + CSS Modules for scoped styles
- Global utility classes (`dna/`) for layout, responsive grid via `_grid.scss`

### Grid System

24-column responsive grid that scales down at breakpoints:

| Breakpoint | Columns |
|------------|---------|
| default    | 1       |
| `sm` (576px)  | 2    |
| `md` (768px)  | 6    |
| `lg` (1024px) | 12   |
| `xl` (1280px) | 24   |

**Container** — wraps content in the column grid. Optional max-width modifiers using design tokens:

```html
<div class="container">...</div>
<div class="container container--xl">...</div>
```

**Column utilities** — place items on the grid:

```html
<div class="container">
  <div class="col-span-24 md-col-span-12 xl-col-span-6">Card</div>
  <div class="col-start-3 col-end-23">Centered content</div>
</div>
```

**In component SCSS** — for component-specific responsive layout, use `grid-column` directly in the `.module.scss`:

```scss
.hero__content {
  grid-column: 1 / -1;

  @media (min-width: 64rem) {
    grid-column: 3 / 13;
  }
}
```

## v2 Scope

- **Care sheets** - @react-pdf/renderer
- **Ailments** — shared ailment model with per-plant overrides for symptoms/treatment
  - **Ailment** — name, slug, description, default symptoms, default treatment, category (enum: watering/light/pests/disease/nutrient), image
  - **PlantAilment** — pivot with optional custom_symptoms, custom_treatment, and image overrides
- Multiple images per plant (gallery, ailment photos)
- Search and filtering (by light, difficulty, toxicity, tags, etc.)
- User accounts and plant collections ("My Plants")
- Care reminders and watering schedules (via Laravel worker service)
- Propagation guides
- Seasonal care tips
- SEO and Open Graph metadata
- **PWA** — Progressive Web App (installable, no app store fees)

### API 
- **trefle.io** https://trefle.io/

### Frontend animations
- https://github.com/camwiegert/baffle?tab=readme-ov-file
- https://www.use-scramble.dev/
