import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import slugify from "slugify";

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

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const baseSlug = slugify(body.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.post.findFirst({
      where: {
        slug,
      },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug,
      content: body.content,
      userId: Number(session.user.id),
      published: false, // default draft
    },
  });

  return NextResponse.json(post, { status: 201 });
}