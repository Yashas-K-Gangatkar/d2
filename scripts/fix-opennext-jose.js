#!/usr/bin/env node
/**
 * DEFINITIVE FIX: Copy the ENTIRE jose package from node_modules to .open-next/
 *
 * OpenNext's copy process is broken — it copies jose's package.json but
 * skips the dist/ directory. esbuild then can't resolve ./dist/browser/index.js.
 *
 * This script runs AFTER the first OpenNext build attempt (which creates .open-next/)
 * and BEFORE the second attempt. It:
 * 1. Finds the source jose in node_modules/ (has correct dist/browser/)
 * 2. Finds all jose packages in .open-next/ (missing dist/browser/)
 * 3. Copies the ENTIRE dist/ directory from source to target
 */
const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const sourceJose = path.join(cwd, "node_modules", "jose");
const openNextNodeModules = path.join(cwd, ".open-next", "server-functions", "default", "node_modules");

console.log("[fix-jose-final] Starting definitive jose fix...");
console.log("[fix-jose-final] Source jose:", sourceJose);
console.log("[fix-jose-final] Target node_modules:", openNextNodeModules);

// Verify source jose has dist/browser/index.js
const sourceBrowserIndex = path.join(sourceJose, "dist", "browser", "index.js");
if (!fs.existsSync(sourceBrowserIndex)) {
  console.log("[fix-jose-final] ERROR: Source jose doesn't have dist/browser/index.js");
  console.log("[fix-jose-final] Cannot fix — aborting");
  process.exit(0);
}
console.log("[fix-jose-final] Source jose OK (has dist/browser/index.js)");

if (!fs.existsSync(openNextNodeModules)) {
  console.log("[fix-jose-final] .open-next/ node_modules not found — nothing to fix");
  process.exit(0);
}

// Find ALL jose directories in .open-next/ (including nested in jwks-rsa)
function findJoseDirs(dir, results = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.name === "jose") {
        const pkgJson = path.join(fullPath, "package.json");
        if (fs.existsSync(pkgJson)) {
          results.push(fullPath);
        }
      }

      // Recurse into subdirectories (but not into jose itself)
      if (entry.name !== "jose") {
        findJoseDirs(fullPath, results);
      }
    }
  } catch (e) {
    // ignore permission errors
  }
  return results;
}

const targetJoseDirs = findJoseDirs(openNextNodeModules);
console.log(`[fix-jose-final] Found ${targetJoseDirs.length} jose package(s) in .open-next/`);

// Copy dist/ directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

let fixed = 0;
for (const targetJose of targetJoseDirs) {
  const targetDist = path.join(targetJose, "dist");
  const targetBrowserIndex = path.join(targetDist, "browser", "index.js");

  // Check if already fixed
  if (fs.existsSync(targetBrowserIndex)) {
    console.log(`[fix-jose-final] OK (already has browser/): ${path.relative(openNextNodeModules, targetJose)}`);
    fixed++;
    continue;
  }

  // Copy entire dist/ from source
  console.log(`[fix-jose-final] Copying dist/ to: ${path.relative(openNextNodeModules, targetJose)}`);
  if (copyDir(path.join(sourceJose, "dist"), targetDist)) {
    // Verify
    if (fs.existsSync(targetBrowserIndex)) {
      console.log(`[fix-jose-final] FIXED: ${path.relative(openNextNodeModules, targetJose)}`);
      fixed++;
    } else {
      console.log(`[fix-jose-final] FAILED: copy didn't create browser/index.js`);
    }
  } else {
    console.log(`[fix-jose-final] FAILED: source dist/ doesn't exist`);
  }
}

console.log(`[fix-jose-final] Done. ${fixed} of ${targetJoseDirs.length} jose packages have dist/browser/index.js`);
