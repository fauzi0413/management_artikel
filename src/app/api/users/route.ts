import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

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
      suggestions.push(`${cleanBase}${Math.floor(Math.random() * 9000) + 1000}`);
    }
  }
  return suggestions;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, username, password, role } = body;

    // Cek email
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ message: "Email sudah digunakan" }, { status: 400 });
    }

    // Cek username
    if (username) {
      const existingUsername = await prisma.user.findUnique({ where: { username } });
      if (existingUsername) {
        const suggestions = await generateUsernameSuggestions(username);
        return NextResponse.json(
          { message: "Username sudah digunakan", suggestions },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username: username || null,
        password: hashedPassword,
        role: role || "user",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}