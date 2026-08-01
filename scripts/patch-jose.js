#!/usr/bin/env node
/**
 * Fix: Create the missing dist/browser/index.js file in jose v6
 *
 * jose v6's package.json has "workerd": "./dist/browser/index.js" but
 * the actual files are in ./dist/webapi/. This script creates the
 * missing dist/browser/ directory by copying from dist/webapi/.
 *
 * This works because OpenNext copies node_modules — if the file exists
 * in the source, it'll exist in the copy.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const nodeModules = path.join(__dirname, "..", "node_modules");
if (!fs.existsSync(nodeModules)) {
  console.log("[fix-jose] node_modules not found, skipping");
  process.exit(0);
}

// Find ALL jose package.json files anywhere in node_modules
let joseDirs = [];
try {
  const output = execSync(
    `find "${nodeModules}" -type d -name "jose" -path "*/node_modules/jose" 2>/dev/null`,
    { encoding: "utf8" }
  ).trim();
  if (output) {
    joseDirs = output.split("\n").filter(Boolean);
  }
} catch (e) {
  // find not available, try manual walk
  console.log("[fix-jose] find failed, trying manual walk...");
}

// Also manually check top-level and common nested locations
const manualPaths = [
  path.join(nodeModules, "jose"),
  path.join(nodeModules, "jwks-rsa", "node_modules", "jose"),
];
for (const p of manualPaths) {
  if (fs.existsSync(path.join(p, "package.json")) && !joseDirs.includes(p)) {
    joseDirs.push(p);
  }
}

console.log(`[fix-jose] Found ${joseDirs.length} jose package(s)`);

let fixed = 0;
for (const joseDir of joseDirs) {
  const pkgJsonPath = path.join(joseDir, "package.json");
  const browserDir = path.join(joseDir, "dist", "browser");
  const webapiDir = path.join(joseDir, "dist", "webapi");
  const browserIndex = path.join(browserDir, "index.js");

  // Check if browser/index.js already exists
  if (fs.existsSync(browserIndex)) {
    console.log(`[fix-jose] OK (already has browser/): ${path.relative(nodeModules, joseDir)}`);
    continue;
  }

  // Check if webapi/ exists (jose v6 stores files here)
  if (!fs.existsSync(webapiDir)) {
    console.log(`[fix-jose] SKIP (no webapi/ either): ${path.relative(nodeModules, joseDir)}`);
    continue;
  }

  // Create browser/ directory and copy everything from webapi/
  try {
    fs.mkdirSync(browserDir, { recursive: true });

    // Recursively copy webapi/ → browser/
    function copyDir(src, dest) {
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
    copyDir(webapiDir, browserDir);

    console.log(`[fix-jose] FIXED (copied webapi/ → browser/): ${path.relative(nodeModules, joseDir)}`);
    fixed++;
  } catch (e) {
    console.log(`[fix-jose] ERROR fixing ${path.relative(nodeModules, joseDir)}: ${e.message}`);
  }
}

console.log(`[fix-jose] Done. ${fixed} of ${joseDirs.length} jose packages fixed.`);
