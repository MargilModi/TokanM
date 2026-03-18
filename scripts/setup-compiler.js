/**
 * setup-compiler.js
 *
 * Seeds the Hardhat compiler cache using the `solc` npm package that is already
 * installed locally.  This avoids any download from binaries.soliditylang.org,
 * which may be unreachable in restricted network environments.
 *
 * Run automatically via the `postinstall` npm lifecycle hook, or manually:
 *   node scripts/setup-compiler.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");

// Resolve the Hardhat compiler cache directory the same way Hardhat does.
// Hardhat uses env-paths("hardhat").cache + "/compilers-v2"
const envPaths = require("env-paths");
const cacheBase = path.join(envPaths("hardhat").cache, "compilers-v2");

// The solc npm package bundled soljson.js (no network needed)
const soljsonSrc = path.join(__dirname, "..", "node_modules", "solc", "soljson.js");

if (!fs.existsSync(soljsonSrc)) {
  console.error(
    "setup-compiler: node_modules/solc/soljson.js not found.\n" +
      "Please run `npm install` first."
  );
  process.exit(1);
}

// Derive the exact version string from the installed solc package
const solcPkg = require(path.join(__dirname, "..", "node_modules", "solc", "package.json"));
const shortVersion = solcPkg.version; // e.g. "0.8.20"

// The long version is embedded in the soljson.js file itself
const solc = require(path.join(__dirname, "..", "node_modules", "solc"));
// e.g. "0.8.20+commit.a1b79de6.Emscripten.clang"
const rawLong = solc.version();
// Strip the ".Emscripten.clang" (or similar) suffix Hardhat list.json doesn't include.
// Expected format after stripping: "0.8.20+commit.a1b79de6"
const longVersion = rawLong.replace(/\.[^.+]+\.[^.+]+$/, "");
if (!/^\d+\.\d+\.\d+\+commit\.[0-9a-f]+$/.test(longVersion)) {
  console.error(
    `setup-compiler: unexpected solc version string format: "${rawLong}"\n` +
      "Cannot determine the correct long version for the Hardhat cache."
  );
  process.exit(1);
}
const commitPart = longVersion.split("+")[1] || "";
const fileName = `soljson-v${longVersion}.js`;

// Compute keccak256 of the soljson.js file using Hardhat's own utility
const { keccak256 } = require(
  path.join(__dirname, "..", "node_modules", "hardhat", "internal", "util", "keccak")
);
const { bytesToHex } = require("@ethereumjs/util");
const soljsonContent = fs.readFileSync(soljsonSrc);
const keccak256Hash = bytesToHex(keccak256(soljsonContent));

const listJson = {
  builds: [
    {
      path: fileName,
      version: shortVersion,
      build: commitPart,
      longVersion: longVersion,
      keccak256: keccak256Hash,
      urls: [`https://binaries.soliditylang.org/wasm/${fileName}`],
      platform: "wasm",
    },
  ],
  releases: { [shortVersion]: fileName },
  latestRelease: shortVersion,
};

// Determine the native platform Hardhat would use
function getHardhatPlatform() {
  switch (os.platform()) {
    case "win32":
      return "windows-amd64";
    case "linux":
      return "linux-amd64";
    case "darwin":
      return "macosx-amd64";
    default:
      return "wasm";
  }
}

const nativePlatform = getHardhatPlatform();
const platforms = nativePlatform === "wasm" ? ["wasm"] : [nativePlatform, "wasm"];

for (const platform of platforms) {
  const platformDir = path.join(cacheBase, platform);
  fs.mkdirSync(platformDir, { recursive: true });

  fs.writeFileSync(path.join(platformDir, "list.json"), JSON.stringify(listJson, null, 2));

  const dest = path.join(platformDir, fileName);
  // Always overwrite to ensure the cached file matches the installed solc package.
  fs.copyFileSync(soljsonSrc, dest);
}

// For native (non-wasm) platforms, mark the native binary as non-functional so
// Hardhat automatically falls back to the JS (wasm) compiler.
if (nativePlatform !== "wasm") {
  const doesNotWorkFile = path.join(
    cacheBase,
    nativePlatform,
    `${fileName}.does.not.work`
  );
  if (!fs.existsSync(doesNotWorkFile)) {
    fs.writeFileSync(doesNotWorkFile, "");
  }
}

console.log(`Solidity ${shortVersion} compiler cache ready (using bundled solcjs).`);
