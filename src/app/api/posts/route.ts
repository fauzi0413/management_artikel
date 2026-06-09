import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const session = await auth();
    const body = await request.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      userId: Number(session?.user?.id),
    },
  });

  return NextResponse.json(post);
}