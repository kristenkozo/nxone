import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { join, extname } from "path";

const UPLOAD_DIR = process.env.NXONE_UPLOADS_PATH || "/data/uploads";

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/svg+xml",
  "image/webp",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

function ensureDir() {
  if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
}

export function saveUpload(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
): { id: string; path: string } | null {
  if (!ALLOWED_TYPES.has(mimeType)) return null;
  if (buffer.length > MAX_SIZE) return null;

  ensureDir();
  const id = randomBytes(12).toString("hex");
  const ext = extname(originalName) || mimeTypeToExt(mimeType);
  const filename = `${id}${ext}`;
  writeFileSync(join(UPLOAD_DIR, filename), buffer);
  return { id, path: `/api/uploads/${filename}` };
}

export function getUpload(filename: string): { buffer: Buffer; mimeType: string } | null {
  const filePath = join(UPLOAD_DIR, filename);
  if (!existsSync(filePath)) return null;
  if (filename.includes("..") || filename.includes("/")) return null;

  const buffer = readFileSync(filePath);
  const ext = extname(filename).toLowerCase();
  return { buffer, mimeType: extToMimeType(ext) };
}

export function deleteUpload(filename: string): boolean {
  if (filename.includes("..") || filename.includes("/")) return false;
  const filePath = join(UPLOAD_DIR, filename);
  if (!existsSync(filePath)) return false;
  unlinkSync(filePath);
  return true;
}

function mimeTypeToExt(mime: string): string {
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "image/x-icon": ".ico",
    "image/vnd.microsoft.icon": ".ico",
  };
  return map[mime] || ".bin";
}

function extToMimeType(ext: string): string {
  const map: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
  };
  return map[ext] || "application/octet-stream";
}
