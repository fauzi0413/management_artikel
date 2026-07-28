'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function CreatePostPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

    async function handleSubmit(
    e: React.FormEvent
    ) {
    e.preventDefault();

    try {
        setLoading(true);

        await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
            title,
            content,
        }),
        });

        router.push("/posts");
        router.refresh();
    } finally {
        setLoading(false);
    }
    }

return (
    <div className="main-heading">
        <h1>Create Post</h1>

        <form
        onSubmit={handleSubmit}
        className="post-form"
        >
        <input
            type="text"
            placeholder="Masukkan judul artikel"
            value={title}
            onChange={(e) =>
            setTitle(e.target.value)
            }
            className="post-input"
        />

        <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Masukkan isi artikel"
        />

        <button
            type="submit"
            className="post-button"
            disabled={loading}
        >
            {loading ? "Saving..." : "Save Post"}
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