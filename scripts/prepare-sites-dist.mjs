import {cpSync, existsSync, mkdirSync, rmSync} from "node:fs";
import {resolve} from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const openNextDir = resolve(projectRoot, ".open-next");
const workerFile = resolve(projectRoot, ".worker-bundle", "worker.js");
const distDir = resolve(projectRoot, "dist");
const serverDir = resolve(distDir, "server");

if (!existsSync(workerFile)) {
  throw new Error("Bundled Cloudflare worker output was not created");
}

rmSync(distDir, {recursive: true, force: true});
mkdirSync(serverDir, {recursive: true});
cpSync(workerFile, resolve(serverDir, "index.js"));

const assetsDir = resolve(openNextDir, "assets");
if (existsSync(assetsDir)) {
  cpSync(assetsDir, resolve(distDir, "static"), {recursive: true});
}
