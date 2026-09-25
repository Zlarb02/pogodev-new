// Injecte le rendu serveur de l'app dans dist/public/index.html,
// pour que le contenu soit lisible sans JavaScript (robots, lecteurs d'écran, no-JS).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist/public/index.html");
const serverDir = path.join(root, "dist/server");

const template = await fs.readFile(indexPath, "utf-8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("Placeholder <!--app-html--> introuvable dans index.html");
}

// Le nom est hashé (entryFileNames de vite.config.ts) : on le retrouve.
const serverFiles = await fs.readdir(serverDir, { recursive: true });
const entry = serverFiles.find((f) => /entry-server.*\.js$/.test(path.basename(f)));
if (!entry) throw new Error("Bundle SSR entry-server introuvable dans dist/server");

const { render } = await import(pathToFileURL(path.join(serverDir, entry)).href);
const appHtml = await render();

await fs.writeFile(indexPath, template.replace("<!--app-html-->", appHtml));
await fs.rm(serverDir, { recursive: true, force: true });
console.log(`Prérendu OK : ${appHtml.length} caractères injectés dans index.html`);
