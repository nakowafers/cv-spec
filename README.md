# cv-spec

Personal CV and portfolio site — a single-page Astro site generated from structured JSON data, with PDF export via LaTeX/pandoc.

## Tech Stack

- **Astro 5** — static site generator, zero JS by default
- **GitHub Pages** — deployment via GitHub Actions
- **Pandoc + XeLaTeX** — canonical PDF generation from `cv-template.tex`
- **Data-driven** — all content lives in `data/*.json`

## Project Structure

```
├── data/                  Source of truth (JSON)
│   ├── profile.json       Name, contact info, professional summary
│   ├── skills.json        Skill categories with items
│   ├── experience.json    Work history with roles and highlights
│   ├── projects.json      Project entries
│   └── education.json     Education entries
├── src/
│   ├── components/        Astro components (Profile, Skills, Experience, etc.)
│   ├── layouts/           Base HTML layout
│   ├── pages/index.astro  Single-page CV
│   └── styles/global.css  Base styles + print stylesheet
├── scripts/
│   └── generate-cv-md.js  Reads data/ → writes CV.md for LaTeX pipeline
├── CV.md                  Generated markdown (input to pandoc)
├── cv-template.tex        LaTeX template for PDF rendering
├── Nicola_Kahale_CV.pdf   Generated PDF (committed artifact)
└── .github/workflows/     GitHub Actions deploy to Pages
```

## Getting Started

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:4321
npm run build     # build static site to dist/
```

## Data Workflow

`data/*.json` is the single source of truth. Edit these files, then rebuild:

1. Edit a JSON file in `data/`
2. Run `npm run build` to regenerate the site
3. Push to `main` — GitHub Actions auto-deploys

### Regenerating CV.md and PDF

```bash
npm run generate-cv-md     # reads data/ → writes CV.md
npm run generate-pdf       # writes CV.md + runs pandoc to produce PDF
```

`generate-pdf` requires pandoc and xelatex installed locally.

## Data Files Reference

| File | Content |
|------|---------|
| `data/profile.json` | Full name, address, phone, email, LinkedIn, professional summary |
| `data/skills.json` | Array of `{ category, items[] }` |
| `data/experience.json` | Array of `{ company, title, startDate, endDate, location, highlights[] }` |
| `data/projects.json` | Array of `{ title, url, subtitle, highlights[] }` |
| `data/education.json` | Array of `{ institution, degree, date, location, gpa, honors? }` |

## Deployment

Push to `main` — the GitHub Action at `.github/workflows/deploy.yml` builds the site and deploys to GitHub Pages.

**URL:** `https://nkahale.github.io/cv-spec/`

## Print / PDF

There are two ways to get a PDF:

1. **Web print** — click "Download PDF" on the site, uses `window.print()` with a dedicated print stylesheet
2. **LaTeX PDF** — `npm run generate-pdf` produces `Nicola_Kahale_CV.pdf` via pandoc + XeLaTeX, matching the original LaTeX template
