import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function readJSON(name) {
  return JSON.parse(readFileSync(join(root, "data", `${name}.json`), "utf-8"));
}

const profile = readJSON("profile");
const skills = readJSON("skills");
const experience = readJSON("experience");
const projects = readJSON("projects");
const education = readJSON("education");

let md = "";

// Name
md += `\\nametitle{${profile.name.toUpperCase()}}\n\n`;

// Contact
const c = profile.contact;
md += `\\contact{${c.address} \\hfill ${c.phone} \\hfill ${c.email} \\hfill ${c.linkedin}}\n\n`;

// Summary
md += "## PROFESSIONAL SUMMARY\n\n";
md += `${profile.summary}\n\n`;

// Skills
md += "## SKILLS\n\n";
for (const group of skills) {
  md += `* **${group.category}**: ${group.items.join(", ")}\n`;
}
md += "\n";

// Projects
md += "## PROJECTS\n\n";
for (const p of projects) {
  md += `### [${p.title}](${p.url}) | ${p.subtitle}\n\n`;
  for (const h of p.highlights) {
    md += `* ${h}\n`;
  }
  md += "\n";
}

// Experience
md += "## EXPERIENCE\n\n";
for (const role of experience) {
  md += `### ${role.company} | ${role.title}\n\n`;
  md += `${role.startDate}-${role.endDate} ${role.location}\n\n`;
  for (const h of role.highlights) {
    md += `* ${h}\n`;
  }
  md += "\n";
}

// Education
md += "## EDUCATION\n\n";
for (const edu of education) {
  md += `### ${edu.institution} | ${edu.degree}\n\n`;
  md += `${edu.date} ${edu.location} GPA: ${edu.gpa}`;
  if (edu.honors) md += `, ${edu.honors}`;
  md += "\n\n";
}

writeFileSync(join(root, "CV.md"), md.trimEnd() + "\n");
console.log("CV.md regenerated from data/");
