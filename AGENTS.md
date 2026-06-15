# AGENTS.md

## Build
- Dev server: `npm run dev`
- Build site: `npm run build` (outputs to `dist/`)
- Regenerate CV.md from JSON data: `npm run generate-cv-md`
- Regenerate PDF (after CV.md): `npm run generate-pdf`

## Workflow
- `data/*.json` is the **single source of truth** — edit JSON files, then rebuild.
- `CV.md` and `Nicola_Kahale_CV.pdf` are generated artifacts from `data/`.
- `src/` contains the Astro web site. Edit components in `src/components/` and styles in `src/styles/`.
- Site deploys to GitHub Pages via GitHub Actions on push to main.

## Data Structure
| File | Content |
|------|---------|
| `data/profile.json` | Name, contact info, professional summary |
| `data/skills.json` | Skill categories with items |
| `data/experience.json` | Work history with roles and highlights |
| `data/projects.json` | Project entries with descriptions |
| `data/education.json` | Education entries |
