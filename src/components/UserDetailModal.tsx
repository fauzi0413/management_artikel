"use client";

import { FaTimes } from "react-icons/fa";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
  onEdit: (user: User) => void;
}

export default function UserDetailModal({
  user,
  onClose,
  onEdit,
}: UserDetailModalProps) {
  return (
    <>
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>User Detail</h2>

        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
            <strong>Role:</strong>{" "}
            <span
                className={`role-badge ${
                user.role === "admin"
                    ? "role-admin"
                    : "role-user"
                }`}
            >
                {user.role}
            </span>
        </p>

        <p>
          <strong>Registered:</strong>{" "}
          {new Date(
            user.createdAt
          ).toLocaleDateString(
            "id-ID"
          )}
        </p>
            
        <div className="modal-actions">
          <button
            className="save-btn"
            onClick={() =>
              onEdit(user)
            }
          >
            Edit User
          </button>
        </div>
    
      </div>
    </div>
   </>
  );
}