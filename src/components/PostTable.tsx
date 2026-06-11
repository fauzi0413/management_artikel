"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import PostDetailModal from "./PostDetailModal";

interface Post {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string | null;
    email: string;
    role: string;
  } | null;
  createdAt: Date;
}

interface PostTableProps {
  posts: Post[];
  skip: number;
}

export default function PostTable({
  posts,
  skip,
}: PostTableProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      <table className="posts-table">
        <thead>
          <tr>
            <th>No</th>

            <th>Title</th>

            <th className="mobile-hide">
              Author
            </th>

            <th className="mobile-hide">
              Date
            </th>

            <th className="text-center">
              Detail
            </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(
            (post, index) => (
              <tr key={post.id}>
                <td>
                  {skip + index + 1}
                </td>

                <td
                  className="post-title"
                  title={post.title}
                >
                  {post.title}
                </td>

                <td className="mobile-hide">
                  {post.user?.name ??
                    "Unknown User"}
                </td>

                <td className="mobile-hide">
                  {new Date(
                    post.createdAt
                  ).toLocaleDateString(
                    "id-ID"
                  )}
                </td>

                <td className="text-center">
                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedPost(
                        post
                      )
                    }
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() =>
            setSelectedPost(null)
          }
        />
      )}
    </>
  );
}