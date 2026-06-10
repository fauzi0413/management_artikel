"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner";

interface CreateUserModalProps {
  onClose: () => void;
}

export default function CreateUserModal({
  onClose,
}: CreateUserModalProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [role, setRole] =
    useState("user");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        toast.error(
        data.message ||
        "Failed to create user"
        );
        return;
      }

      toast.success(
        "User created successfully"
      );

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      onClose();

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          <FaTimes />
        </button>

        <h2>Create User</h2>

        <form
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              minLength={6}
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
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}