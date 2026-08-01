#!/usr/bin/env node
/**
 * Postinstall patch: Fix jose package "workerd" export condition
 *
 * jose v6 has a broken "workerd" export that points to ./dist/browser/index.js
 * which doesn't exist (files are in ./dist/webapi/ instead).
 *
 * This script finds ALL jose package.json files in node_modules (including nested
 * ones inside jwks-rsa/node_modules/) and removes the "workerd" export condition.
 * This prevents esbuild from trying to resolve the missing file during OpenNext bundling.
 *
 * npm overrides don't work reliably with npm clean-install (npm ci), so this
 * direct patch is the most reliable fix.
 */
const fs = require("fs");
const path = require("path");

function findJosePkgJsons(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules") {
      const nmPath = path.join(dir, entry.name);
      try {
        const pkgs = fs.readdirSync(nmPath, { withFileTypes: true });
        for (const pkg of pkgs) {
          if (pkg.name.startsWith("@")) {
            const scopedPath = path.join(nmPath, pkg.name);
            const scopedPkgs = fs.readdirSync(scopedPath, { withFileTypes: true });
            for (const sp of scopedPkgs) {
              if (sp.isDirectory()) {
                const pkgJsonPath = path.join(scopedPath, sp.name, "package.json");
                if (sp.name === "jose" && fs.existsSync(pkgJsonPath)) {
                  results.push(pkgJsonPath);
                }
                findJosePkgJsons(path.join(scopedPath, sp.name), results);
              }
            }
          } else if (pkg.isDirectory()) {
            const pkgJsonPath = path.join(nmPath, pkg.name, "package.json");
            if (pkg.name === "jose" && fs.existsSync(pkgJsonPath)) {
              results.push(pkgJsonPath);
            }
            findJosePkgJsons(path.join(nmPath, pkg.name), results);
          }
        }
      } catch (e) {
        // ignore permission errors
      }
    }
  }
  return results;
}

const root = path.join(__dirname, "..", "node_modules");
if (!fs.existsSync(root)) {
  console.log("[patch-jose] node_modules not found, skipping");
  process.exit(0);
}

const joseFiles = findJosePkgJsons(root);
let patched = 0;

for (const file of joseFiles) {
  try {
    const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!pkg.exports) continue;

    let modified = false;

    // Fix: remove "workerd" from all export conditions
    function fixExports(exports) {
      if (typeof exports !== "object" || exports === null) return exports;
      for (const key of Object.keys(exports)) {
        if (key === "workerd") {
          delete exports[key];
          modified = true;
        } else if (typeof exports[key] === "object") {
          fixExports(exports[key]);
        }
      }
      return exports;
    }

    fixExports(pkg.exports);

    if (modified) {
      fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
      console.log(`[patch-jose] Patched ${path.relative(root, file)}`);
      patched++;
    }
  } catch (e) {
    // ignore parse errors
  }
}

console.log(`[patch-jose] Done. ${patched} of ${joseFiles.length} jose packages patched.`);
