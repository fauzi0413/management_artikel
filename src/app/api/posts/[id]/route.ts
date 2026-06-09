import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const body = await request.json();

  const post = await prisma.post.update({
    where: {
      id: Number(id),
      userId: Number(session.user.id),
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const post = await prisma.post.findFirst({
    where: {
      id: Number(id),
      userId: Number(session.user.id),
    },
  });

  if (!post) {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Post deleted",
  });
}