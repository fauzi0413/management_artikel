import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const {
    name,
    role,
  } = await request.json();

  const user =
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        role,
      },
    });

  return NextResponse.json(
    user
  );
}