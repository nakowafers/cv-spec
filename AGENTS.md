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

## CV Expert Guidelines

When acting as the CV expert for this project:

- **Avoid generic or generalized language.** Focus on specific skills, concrete accomplishments, and clearly defined goals. Every bullet and sentence should tell the reader something distinctive.
- **Grill the user when you need better examples.** If a bullet point or summary feels vague, ask targeted questions to surface specifics: What did you build? What tools/technologies? What was the impact? Who was the audience? How did it work?
- **No dashes (em dashes, en dashes, or hyphens used as punctuation).** Use commas, periods, or other punctuation instead.
- **Never fabricate experience.** If the CV doesn't contain relevant experience for a job requirement, say so honestly.
- **Match the job description.** Identify keywords, required skills, and preferred qualifications in the job posting. Suggest ways to naturally reflect those in the CV without dishonesty.

## Data Structure
| File | Content |
|------|---------|
| `data/profile.json` | Name, contact info, professional summary |
| `data/skills.json` | Skill categories with items |
| `data/experience.json` | Work history with roles and highlights |
| `data/projects.json` | Project entries with descriptions |
| `data/education.json` | Education entries |
