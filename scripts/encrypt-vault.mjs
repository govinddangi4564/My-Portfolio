import { createCipheriv, createHash, pbkdf2Sync, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const source = join(process.cwd(), "private-documents");
const output = join(process.cwd(), "public", "vault");
const password = process.env.VAULT_PASSWORD;
const iterations = 600_000;
const types = { ".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

if (!password || password.length < 12) throw new Error("Set VAULT_PASSWORD to a unique password with at least 12 characters.");
if (!existsSync(source)) throw new Error("Create private-documents/ and place the original documents there. It is ignored by Git.");
const files = readdirSync(source, { withFileTypes: true }).filter((entry) => entry.isFile());
if (!files.length) throw new Error("private-documents/ contains no files.");

const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, iterations, 32, "sha256");
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
const documents = files.map((entry) => {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(readFileSync(join(source, entry.name))), cipher.final(), cipher.getAuthTag()]);
  const id = createHash("sha256").update(entry.name).digest("hex").slice(0, 16);
  const file = `${id}.enc`;
  writeFileSync(join(output, file), encrypted);
  return { id, name: entry.name, file, iv: iv.toString("base64"), type: types[extname(entry.name).toLowerCase()] || "application/octet-stream" };
});
writeFileSync(join(output, "manifest.json"), `${JSON.stringify({ version: 1, kdf: { algorithm: "PBKDF2", hash: "SHA-256", iterations, salt: salt.toString("base64") }, documents }, null, 2)}\n`);
console.log(`Encrypted ${documents.length} document(s). Commit public/vault only; never commit private-documents.`);