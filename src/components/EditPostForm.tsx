"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function EditPostForm({
  post,
}: {
  post: Post;
}) {
  const router = useRouter();

  const [title, setTitle] =
    useState(post.title);

  const [content, setContent] =
    useState(post.content);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await fetch(
        `/api/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      router.push(
        "/posts/my-posts"
      );

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-heading">
      <h1>Edit Post</h1>

      <form
        onSubmit={handleSubmit}
        className="post-form"
      >
        <input
          type="text"
          className="post-input"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <RichTextEditor
          value={content}
          onChange={setContent}
        />

        <button
          className="post-button"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Post"}
        </button>
      </form>

      <div className="back-wrapper">
            <Link
                href="/posts/my-posts"
                className="back-btn"
            >
                ← Kembali
            </Link>
        </div>

    </div>
  );
}