import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";

export default async function MyPostsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: Number(session.user.id),
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Your Posts</h1>
          <p>Manage all posts you have created.</p>
        </div>

        <Link
          href="/posts/create"
          className="create-post-btn"
        >
          + Create Post
        </Link>
      </div>

      <div className="table-card">
        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No Posts Yet</h3>
            <p>
              You haven't created any posts.
            </p>
          </div>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th className="width=180 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
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
      </div>
    </div>
  );
}