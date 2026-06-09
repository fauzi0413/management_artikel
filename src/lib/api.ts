import { prisma } from "./prisma";

export async function getLastPost() {
  return await prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllPostIds(page: number) {
  const limit = 10;
  const skip = (page - 1) * limit;

  return await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostById(id: number) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

export async function getTotalPosts() {
  return await prisma.post.count();
}