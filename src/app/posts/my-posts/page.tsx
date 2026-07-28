import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function MyPostsPage({searchParams}: PageProps) {
  const session = await auth();
  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.search || "";
  const limit = 10;
  const skip = (page - 1) * limit;

  if (!session) {
    redirect("/login");
  }

  const totalPosts = await prisma.post.count({
    where: {
      userId: Number(session.user.id),
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const totalPages = Math.ceil(
    totalPosts / limit
  );

  const userId = Number(session.user.id);

  const posts = await prisma.post.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "desc",
    },
    take: limit,
    skip,
  });
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 style={{textAlign:"left"}}>Posts Saya</h1>
          <p style={{textAlign:"left"}}>Kelola semua post yang kamu buat. Sekarang kamu memiliki <span className="font-bold">{totalPosts}</span> post.</p>
        </div>

        <Link
          href="/posts/create"
          className="create-post-btn"
        >
          + Create Post
        </Link>
      </div>

      <div className="dashboard-toolbar">
        <SearchForm initialSearch={search} basePath="/posts/my-posts"/>
      </div>

      <div className="table-card">
        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No Posts Yet</h3>
            <p>
              You haven&apos;t created any posts.
            </p>
          </div>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Date</th>
                <th className="width=180 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{skip + index + 1}</td>
                  <td>{post.title}</td>

                  <td>
                    {new Date(
                      post.createdAt
                    ).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>

                  <td className="text-center">
                    <div className="table-actions">
                      <Link
                        href={`/posts/edit/${post.id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <DeletePostButton postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination page={page} totalPages={totalPages} basePath="/posts/my-posts" search={search}/>
      </div>
    </div>
  );
}