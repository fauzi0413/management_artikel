"use client";

import { useRouter } from "next/navigation";

interface Props {
  postId: number;
}

export default function DeletePostButton({
  postId,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus artikel ini?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      `/api/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="delete-btn"
    >
      Delete
    </button>
  );
}