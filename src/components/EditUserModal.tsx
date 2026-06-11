"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onBack: () => void;
}

export default function EditUserModal({
  user,
  onClose,
  onBack,
}: EditUserModalProps) {
  const router = useRouter();

  const [name, setName] =
    useState(user.name || "");

  const [role, setRole] =
    useState(user.role);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              role,
            }),
          }
        );

      if (!response.ok) {
        alert(
          "Failed to update user"
        );
        return;
      }

      onClose();

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>Edit User</h2>

        <form
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >
              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onBack}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}