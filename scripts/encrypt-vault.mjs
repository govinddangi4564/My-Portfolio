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
const encrypt = (value, iv) => { const cipher = createCipheriv("aes-256-gcm", key, iv); return Buffer.concat([cipher.update(value), cipher.final(), cipher.getAuthTag()]); };
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
const documents = files.map((entry) => {
  const id = createHash("sha256").update(entry.name).digest("hex").slice(0, 16);
  const iv = randomBytes(12); const file = `${id}.enc`;
  writeFileSync(join(output, file), encrypt(readFileSync(join(source, entry.name)), iv));
  return { id, file, iv: iv.toString("base64"), name: entry.name, type: types[extname(entry.name).toLowerCase()] || "application/octet-stream" };
});
const metadataIv = randomBytes(12);
const metadata = encrypt(Buffer.from(JSON.stringify({ documents: documents.map(({ id, name, type }) => ({ id, name, type })) })), metadataIv);
writeFileSync(join(output, "manifest.json"), `${JSON.stringify({ version: 2, kdf: { algorithm: "PBKDF2", hash: "SHA-256", iterations, salt: salt.toString("base64") }, metadata: { iv: metadataIv.toString("base64"), data: metadata.toString("base64") }, documents: documents.map(({ id, file, iv }) => ({ id, file, iv })) }, null, 2)}\n`);
console.log(`Encrypted ${documents.length} document(s). Names are encrypted too. Commit public/vault only; never commit private-documents.`);