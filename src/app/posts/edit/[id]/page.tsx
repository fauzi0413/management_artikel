import { prisma } from "@/lib/prisma";
import EditPostForm from "@/components/EditPostForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPage({
  params,
}: PageProps) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    return <h1>Post tidak ditemukan</h1>;
  }

  return <EditPostForm post={post} />;
}