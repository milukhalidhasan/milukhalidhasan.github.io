// Writes the project cards from the PROJECTS list in script.js into the Projects section of index.html,
// so the projects are listed even when JavaScript is off (script.js re-renders them for the filters and search).
// Run it after editing PROJECTS: node tools/render-projects.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const js = readFileSync(join(root, "script.js"), "utf8");
const pick = (start, end) => {
  const i = js.indexOf(start);
  if (i < 0) throw new Error(`not found in script.js: ${start}`);
  return js.slice(i, js.indexOf(end, i) + end.length);
};
// The project list, the HTML escaper and the card template, exactly as script.js uses them
const code = [pick("const GH", "];\n"), pick("const escapeHtml", "[c]);\n"), pick("function projectCard", "\n}\n")].join("\n");
const cards = new Function(`${code}\nreturn PROJECTS.map(projectCard).join("");`)();

const file = join(root, "index.html");
const html = readFileSync(file, "utf8");
const start = "<!-- cards:start -->", end = "<!-- cards:end -->";
const a = html.indexOf(start), b = html.indexOf(end);
if (a < 0 || b < a) throw new Error("card markers not found in index.html");
writeFileSync(file, html.slice(0, a + start.length) + cards + "\n        " + html.slice(b));
console.log(`wrote ${cards.match(/<article/g).length} project cards into index.html`);
