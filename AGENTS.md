# AGENTS.md

## Build
- Regenerate PDF: `pandoc CV.md --template=cv-template.tex -o Nicola_Kahale_CV.pdf --pdf-engine=xelatex --lua-filter=include.lua`
- No other build, test, lint, or CI infrastructure exists.

## Workflow
- `CV.md` is the single source of truth — edit this file, then rebuild the PDF.
- `cv-template.tex` is the LaTeX wrapper used by Pandoc.
- `Nicola_Kahale_CV.pdf` is the generated artifact (committed for convenience).
