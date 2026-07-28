import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper: generate 3 unique username suggestions
async function generateUsernameSuggestions(base: string): Promise<string[]> {
  const cleanBase = base.toLowerCase().replace(/[^a-z0-9]/g, "");
  const candidates = [
    `${cleanBase}${Math.floor(Math.random() * 900) + 100}`,
    `${cleanBase}_${Math.floor(Math.random() * 90) + 10}`,
    `${cleanBase}${new Date().getFullYear()}`,
  ];

  const suggestions: string[] = [];
  for (const candidate of candidates) {
    const exists = await prisma.user.findUnique({ where: { username: candidate } });
    if (!exists) {
      suggestions.push(candidate);
    } else {
      // fallback with extra random
      const fallback = `${cleanBase}${Math.floor(Math.random() * 9000) + 1000}`;
      suggestions.push(fallback);
    }
  }
  return suggestions;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ available: false, message: "Username diperlukan" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { username } });

  if (existing) {
    const suggestions = await generateUsernameSuggestions(username);
    return NextResponse.json({ available: false, suggestions });
  }

  return NextResponse.json({ available: true });
}
