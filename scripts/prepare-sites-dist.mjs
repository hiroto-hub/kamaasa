import {cpSync, existsSync, mkdirSync, rmSync} from "node:fs";
import {resolve} from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const openNextDir = resolve(projectRoot, ".open-next");
const workerFile = resolve(openNextDir, "worker.js");
const distDir = resolve(projectRoot, "dist");
const serverDir = resolve(distDir, "server");

if (!existsSync(workerFile)) {
  throw new Error("OpenNext worker output was not created");
}

rmSync(distDir, {recursive: true, force: true});
mkdirSync(serverDir, {recursive: true});
cpSync(openNextDir, serverDir, {recursive: true});
cpSync(workerFile, resolve(serverDir, "index.js"));

const assetsDir = resolve(openNextDir, "assets");
if (existsSync(assetsDir)) {
  // Static assets are deployed separately below. Keeping a second copy inside
  // the Worker bundle can push the Worker over the hosting traversal limit.
  rmSync(resolve(serverDir, "assets"), {recursive: true, force: true});
  cpSync(assetsDir, resolve(distDir, "static"), {recursive: true});
}
