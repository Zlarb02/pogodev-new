const fs = require("fs");
const path = require("path");

// Créer un lien symbolique du dossier node_modules/@
// vers le dossier client/src pour le développement
const targetDir = path.resolve(__dirname, "node_modules/@");
const sourceDir = path.resolve(__dirname, "client/src");

// S'assurer que le dossier parent existe
if (!fs.existsSync(path.dirname(targetDir))) {
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
}

// Supprimer le lien existant s'il existe
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

// Créer le lien symbolique
fs.symlinkSync(sourceDir, targetDir, "dir");

console.log(`Lien symbolique créé: ${targetDir} -> ${sourceDir}`);
