import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "POSTS.json");

const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : join(process.cwd(), "output");

mkdirSync(outDir, { recursive: true });

const data = readFileSync(source, "utf8");

// Fail fast if the list is not valid JSON instead of copying a broken file.
const parsed = JSON.parse(data);
if (!Array.isArray(parsed.posts) || parsed.posts.length === 0) {
  throw new Error("POSTS.json must contain a non-empty posts array");
}

writeFileSync(join(outDir, "POSTS.json"), data);

console.log(`Wrote ${parsed.posts.length} posts to ${join(outDir, "POSTS.json")}`);
