"use client";

import { FaTimes } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
  } | null;
}

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

export default function PostDetailModal({
  post,
  onClose,
}: PostDetailModalProps) {
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