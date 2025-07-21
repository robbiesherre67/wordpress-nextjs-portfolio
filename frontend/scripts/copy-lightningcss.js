#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Map Node’s platform/arch to the optional package names
const mapping = {
  'darwin-arm64': 'lightningcss-darwin-arm64',
  'linux-x64':   'lightningcss-linux-x64',
};

const platformKey = `${process.platform}-${process.arch}`;
const pkgName = mapping[platformKey];

if (!pkgName) {
  console.warn(`[copy-lightningcss] Unsupported platform "${platformKey}", skipping.`);
  process.exit(0);
}

let srcDir;
try {
  // Resolve the package.json of the optional dep to find its folder
  const pkgJson = require.resolve(`${pkgName}/package.json`);
  srcDir = path.dirname(pkgJson);
} catch {
  console.warn(`[copy-lightningcss] Optional dependency "${pkgName}" not installed, skipping.`);
  process.exit(0);
}

// Look for any .node file in that folder
const binaries = fs.readdirSync(srcDir).filter((f) => f.endsWith('.node'));
if (binaries.length === 0) {
  console.warn(`[copy-lightningcss] No .node binary found in ${srcDir}, skipping.`);
  process.exit(0);
}

const binaryName = binaries[0];
const src = path.join(srcDir, binaryName);
const destDir = path.resolve(__dirname, '..', 'node_modules', 'lightningcss', 'node');
const dest = path.join(destDir, `lightningcss.${platformKey}.node`);

try {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`[copy-lightningcss] Copied ${binaryName} to ${dest}`);
} catch (err) {
  console.error(`[copy-lightningcss] Failed to copy binary:`, err);
  process.exit(1);
}