# plantPunkOS

A plant encyclopedia that catalogs houseplants with their care requirements, helping plant lovers find the right info for their green friends.

## Project Structure

- `plantpunk-api/` — Laravel 12 + Filament 5 backend (REST API + admin panel)
- `plantpunk-web/` — Next.js 16 frontend

## Tech Stack

**Backend:** Laravel 12, Filament 5, MySQL, Lando
**Frontend:** Next.js 16, TypeScript, SCSS (BEM + CSS Modules)

## v1 Scope

### Data Model
- **Plant** — name, scientific name, slug, description, image, care info (light, watering, humidity, difficulty, substrate, temperature range), tips, toxicity
- **Category** — plant families (e.g. Araceae, Cactaceae) — one-to-many with Plant
- **Tag** — traits like trailing, variegated, pet-safe — many-to-many with Plant
- **Enums** — Light, Watering, Humidity, Difficulty

### Backend (API + Admin)
- Filament admin panel for managing plants, categories, and tags
- Public REST API (`/api/v1/`) for the frontend
- Custom login with username or email
- Custom theme (Space Grotesk font)

### Frontend
- Server-side rendered plant listing and detail pages
- Header with app name and version fetched from API
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

- **Ailments** — shared ailment model with per-plant overrides for symptoms/treatment
  - **Ailment** — name, slug, description, default symptoms, default treatment, category (enum: watering/light/pests/disease/nutrient), image
  - **PlantAilment** — pivot with optional custom_symptoms, custom_treatment, and image overrides
- Spatie Media Library for multiple images per plant (gallery, ailment photos)
- Search and filtering (by light, difficulty, toxicity, tags, etc.)
  - Client-side filtering with `useState` + `.filter()` — plant collection is small enough to filter in-browser without extra API calls
  - No need for TanStack Query or server-side search at this stage
- User accounts and plant collections ("My Plants")
- Care reminders and watering schedules
- Propagation guides
- Seasonal care tips
- SEO and Open Graph metadata
- API restructure: group characteristics into nested object (light, watering, humidity, difficulty, substrate, temperature, toxicity)
- **PWA** — Progressive Web App (installable, no app store fees) — [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps)

### Tech Decisions
- **TanStack Query** — not needed for v1. Current server-side fetching in Next.js server components is simpler and more performant. Reconsider if the app becomes heavily interactive (user accounts, mutations, real-time data)
