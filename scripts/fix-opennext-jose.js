#!/usr/bin/env node
/**
 * Fix jose in .open-next/ AFTER OpenNext copies node_modules but BEFORE esbuild runs.
 *
 * OpenNext's copy process skips jose's dist/browser/ directory (even though it's
 * in the "files" field). This script creates it by copying from dist/webapi/.
 *
 * Usage: Called between two OpenNext build attempts.
 */
const fs = require("fs");
const path = require("path");

const openNextDir = path.join(process.cwd(), ".open-next", "server-functions", "default", "node_modules");

if (!fs.existsSync(openNextDir)) {
  console.log("[fix-opennext-jose] .open-next not found, nothing to fix");
  process.exit(0);
}

// Find all jose packages in .open-next
function findJoseDirs(dir, results = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === "jose") {
          const josePath = path.join(dir, entry.name);
          if (fs.existsSync(path.join(josePath, "package.json"))) {
            results.push(josePath);
          }
        }
        // Don't recurse into jose itself, but check other node_modules
        if (entry.name === "node_modules" || (entry.name !== "jose" && entry.name !== ".bin")) {
          findJoseDirs(path.join(dir, entry.name), results);
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return results;
}

const joseDirs = findJoseDirs(openNextDir);
console.log(`[fix-opennext-jose] Found ${joseDirs.length} jose package(s) in .open-next/`);

let fixed = 0;
for (const joseDir of joseDirs) {
  const browserDir = path.join(joseDir, "dist", "browser");
  const webapiDir = path.join(joseDir, "dist", "webapi");
  const browserIndex = path.join(browserDir, "index.js");

  if (fs.existsSync(browserIndex)) {
    console.log(`[fix-opennext-jose] OK (has browser/): ${path.relative(openNextDir, joseDir)}`);
    continue;
  }

  if (!fs.existsSync(webapiDir)) {
    console.log(`[fix-opennext-jose] SKIP (no webapi/): ${path.relative(openNextDir, joseDir)}`);
    continue;
  }

  try {
    fs.mkdirSync(browserDir, { recursive: true });
    function copyDir(src, dest) {
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
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
    console.log(`[fix-opennext-jose] FIXED: ${path.relative(openNextDir, joseDir)}`);
    fixed++;
  } catch (e) {
    console.log(`[fix-opennext-jose] ERROR: ${e.message}`);
  }
}

console.log(`[fix-opennext-jose] Done. ${fixed} of ${joseDirs.length} fixed.`);
