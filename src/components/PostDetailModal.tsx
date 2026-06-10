"use client";

import { FaTimes } from "react-icons/fa";

export default function PostDetailModal({
  post,
  onClose,
}: any) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>{post.title}</h2>

        <p>
          <strong>Author:</strong>{" "}
          {post.user?.name}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            post.createdAt
          ).toLocaleDateString(
            "id-ID"
          )}
        </p>

        <hr />

        <div className="post-content">
          <p><strong>Content:</strong></p>
          {post.content}
        </div>
      </div>
    </div>
  );
}