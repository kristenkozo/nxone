import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSessionToken, sessionCookieOptions } from "@/lib/auth";
import { getUser, toProfile } from "@/lib/users";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password || !validateCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken(username);
  const stored = getUser(username);
  const res = NextResponse.json({ user: stored ? toProfile(stored) : { username, firstName: "", lastName: "", role: "member" } });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
