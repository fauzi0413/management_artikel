"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import PostDetailModal from "./PostDetailModal";

export default function PostTable({
  posts,
  skip,
}: any) {
  const [
    selectedPost,
    setSelectedPost,
  ] = useState(null);

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

            <th className="">
              Detail
            </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(
            (post: any, index: number) => (
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

                <td className="">
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