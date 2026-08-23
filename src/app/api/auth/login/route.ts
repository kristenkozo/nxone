import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSessionToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password || !validateCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken(username);
  const res = NextResponse.json({ user: username });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
