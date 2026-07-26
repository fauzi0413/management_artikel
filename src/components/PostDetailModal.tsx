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

        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--brand-primary)", lineHeight: 1.3 }}>
          {post.title}
        </h2>

        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", fontSize: "0.85rem" }}>
          <span style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>
            <strong style={{ opacity: 0.7 }}>By:</strong> {post.user?.name || "Unknown"}
          </span>
          <span style={{ background: "rgba(107, 114, 128, 0.1)", color: "#6b7280", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>
            {new Date(post.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div style={{ background: "rgba(0,0,0,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6b7280", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Content
          </p>
          <div style={{ lineHeight: 1.7, color: "var(--text-color)", fontSize: "0.95rem" }}>
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
}