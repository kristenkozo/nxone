import { createHash, randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export interface StoredUser {
  username: string;
  passwordHash: string;
  salt: string;
  role: "admin" | "member";
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export function toProfile(user: StoredUser): UserProfile {
  return {
    username: user.username,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    role: user.role,
  };
}

const DB_PATH = process.env.NXONE_DB_PATH || "/data/users.json";

function hashPassword(password: string, salt: string): string {
  return createHash("sha256").update(salt + password).digest("hex");
}

function readDb(): StoredUser[] {
  try {
    if (!existsSync(DB_PATH)) return [];
    return JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeDb(users: StoredUser[]) {
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

function ensureSeeded(): StoredUser[] {
  let users = readDb();
  if (users.length > 0) return users;

  const seedUser = process.env.NXONE_ADMIN_USER || "kristen";
  const seedPass = process.env.NXONE_ADMIN_PASS || "password123!";
  const salt = randomBytes(16).toString("hex");
  users = [
    {
      username: seedUser,
      passwordHash: hashPassword(seedPass, salt),
      salt,
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ];
  writeDb(users);
  return users;
}

export function getUsers(): StoredUser[] {
  return ensureSeeded();
}

export function getUser(username: string): StoredUser | undefined {
  return getUsers().find((u) => u.username === username);
}

export function validatePassword(username: string, password: string): boolean {
  const user = getUser(username);
  if (!user) return false;
  return user.passwordHash === hashPassword(password, user.salt);
}

export function createUser(
  username: string,
  password: string,
  role: "admin" | "member" = "member",
): StoredUser | null {
  const users = getUsers();
  if (users.some((u) => u.username === username)) return null;

  const salt = randomBytes(16).toString("hex");
  const newUser: StoredUser = {
    username,
    passwordHash: hashPassword(password, salt),
    salt,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeDb(users);
  return newUser;
}

export function updateUser(
  username: string,
  updates: { firstName?: string; lastName?: string },
): StoredUser | null {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return null;
  if (updates.firstName !== undefined) user.firstName = updates.firstName;
  if (updates.lastName !== undefined) user.lastName = updates.lastName;
  writeDb(users);
  return user;
}

export function deleteUser(username: string): boolean {
  const users = getUsers();
  const filtered = users.filter((u) => u.username !== username);
  if (filtered.length === users.length) return false;
  writeDb(filtered);
  return true;
}

export function listUsers(): { username: string; role: string; createdAt: string }[] {
  return getUsers().map(({ username, role, createdAt }) => ({
    username,
    role,
    createdAt,
  }));
}
