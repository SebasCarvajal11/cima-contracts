import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const WORKSPACE_DIR = path.resolve(ROOT_DIR, "..");

const TARGET_SERVICES = [
  "crm-auth",
  "crm-collab",
  "crm-media",
  "crm-frontend",
];

const DIRS_TO_SYNC = ["src", "dist"];
const FILES_TO_SYNC = ["package.json", "tsconfig.json", "pnpm-lock.yaml", "README.md", "AGENTS.md"];

function syncDirectory(srcPath, destPath) {
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
  }
  fs.cpSync(srcPath, destPath, { recursive: true });
}

function syncFile(srcFile, destFile) {
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

function syncServiceContracts(serviceName) {
  const serviceDir = path.join(WORKSPACE_DIR, serviceName);
  if (!fs.existsSync(serviceDir)) {
    console.warn(`[contracts-sync] Skipped ${serviceName}: directory not found`);
    return;
  }

  const vendoredContractsDir = path.join(serviceDir, "cima-contracts");
  if (!fs.existsSync(vendoredContractsDir)) {
    fs.mkdirSync(vendoredContractsDir, { recursive: true });
  }

  for (const dir of DIRS_TO_SYNC) {
    const src = path.join(ROOT_DIR, dir);
    const dest = path.join(vendoredContractsDir, dir);
    syncDirectory(src, dest);
  }

  for (const file of FILES_TO_SYNC) {
    const src = path.join(ROOT_DIR, file);
    const dest = path.join(vendoredContractsDir, file);
    syncFile(src, dest);
  }

  console.log(`[contracts-sync] Successfully synced contracts to ${serviceName}/cima-contracts`);
}

function main() {
  const distPath = path.join(ROOT_DIR, "dist");
  if (!fs.existsSync(distPath)) {
    console.error("[contracts-sync] dist/ not found. Run 'pnpm build' in cima-contracts first.");
    process.exit(1);
  }

  const cliTargets = process.argv.slice(2).filter(Boolean);
  const targetServices = cliTargets.length > 0 ? cliTargets : TARGET_SERVICES;

  console.log(`[contracts-sync] Starting sync from canonical cima-contracts to: ${targetServices.join(", ")}`);
  for (const service of targetServices) {
    syncServiceContracts(service);
  }
  console.log("[contracts-sync] Vendored contracts sync complete.");
}

main();
