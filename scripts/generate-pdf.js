import { readFileSync, writeFileSync, mkdtempSync, copyFileSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const OUTPUT_PDF = join(root, "Nicola_Kahale_CV.pdf");

function readJSON(name) {
  return JSON.parse(readFileSync(join(root, "data", `${name}.json`), "utf-8"));
}

function esc(text) {
  return String(text)
    .replace(/\\/g, "\\textbackslash ")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/\|/g, "\\textbar{}");
}

const profile = readJSON("profile");
const skills = readJSON("skills");
const experience = readJSON("experience");
const projects = readJSON("projects");
const education = readJSON("education");

const preamble = `\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{fontspec}
\\usepackage{titlesec}
\\usepackage{hyperref}
\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setmainfont{Inter}[Ligatures=TeX]
\\titleformat{\\subsection}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing{\\subsection}{0pt}{14pt}{6pt}
\\newcommand{\\contact}[1]{\\vspace{2pt}\\par\\noindent\\hbox to \\textwidth{\\small #1}\\par\\vspace{2pt}}
\\newcommand{\\nametitle}[1]{{\\Huge\\bfseries \\noindent #1}\\par\\vspace{4pt}}
\\begin{document}
`;

let body = "";

body += `\\nametitle{${esc(profile.name).toUpperCase()}}\n\n`;

const c = profile.contact;
body += `\\contact{${esc(c.address)} \\hfill ${esc(c.phone)} \\hfill ${esc(c.email)} \\hfill ${esc(c.linkedin)}}\n\n`;

body += `\\subsection{PROFESSIONAL SUMMARY}\n\n`;
body += `${esc(profile.summary)}\n\n`;

body += `\\subsection{SKILLS}\n\n`;
body += `\\begin{itemize}\n`;
for (const group of skills) {
  const items = group.items.map(i => esc(i)).join(", ");
  body += `  \\item \\textbf{${esc(group.category)}}: ${items}\n`;
}
body += `\\end{itemize}\n\n`;

body += `\\subsection{PROJECTS}\n\n`;
for (const p of projects) {
  body += `\\subsubsection{\\href{${p.url}}{${esc(p.title)}} \\textbar{} ${esc(p.subtitle)}}\n\n`;
  body += `\\begin{itemize}\n`;
  for (const h of p.highlights) {
    body += `  \\item ${esc(h)}\n`;
  }
  body += `\\end{itemize}\n\n`;
}

body += `\\subsection{EXPERIENCE}\n\n`;
for (const role of experience) {
  body += `\\subsubsection{${esc(role.company)} \\textbar{} ${esc(role.title)}}\n\n`;
  body += `${esc(role.startDate)}-${esc(role.endDate)} ${esc(role.location)}\n\n`;
  body += `\\begin{itemize}\n`;
  for (const h of role.highlights) {
    body += `  \\item ${esc(h)}\n`;
  }
  body += `\\end{itemize}\n\n`;
}

body += `\\subsection{EDUCATION}\n\n`;
for (const edu of education) {
  body += `\\subsubsection{${esc(edu.institution)} \\textbar{} ${esc(edu.degree)}}\n\n`;
  body += `${esc(edu.date)} ${esc(edu.location)} GPA: ${esc(edu.gpa)}`;
  if (edu.honors) body += `, ${esc(edu.honors)}`;
  body += `\n\n`;
}

const documentTex = preamble + body + "\\end{document}\n";

const tmpDir = mkdtempSync(join(tmpdir(), "cv-"));
const texPath = join(tmpDir, "cv.tex");
writeFileSync(texPath, documentTex);

try {
  execSync("xelatex -interaction=nonstopmode cv.tex", { cwd: tmpDir, stdio: "pipe" });
  execSync("xelatex -interaction=nonstopmode cv.tex", { cwd: tmpDir, stdio: "pipe" });
  copyFileSync(join(tmpDir, "cv.pdf"), OUTPUT_PDF);
  console.log(`PDF generated: ${OUTPUT_PDF}`);
} catch {
  try {
    const log = readFileSync(join(tmpDir, "cv.log"), "utf-8");
    const lines = log.split("\n").filter(l => l.includes("Error") || l.includes("Fatal") || l.includes("!"));
    console.error(`XeLaTeX compilation failed. Errors:\n${lines.join("\n")}`);
    console.error("\nFull log written to /tmp/cv-error.log");
    writeFileSync("/tmp/cv-error.log", log);
  } catch {
    console.error("XeLaTeX compilation failed with no log output.");
  }
  process.exit(1);
} finally {
  rmSync(tmpDir, { recursive: true, force: true });
}
