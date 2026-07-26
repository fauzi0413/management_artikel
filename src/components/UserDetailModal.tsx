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

        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "var(--brand-primary)" }}>User Detail</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Name</span>
            <span style={{ fontWeight: 600, color: "var(--text-color)" }}>{user.name || "Unknown"}</span>
          </div>

          <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Email</span>
            <span style={{ fontWeight: 500, color: "var(--text-color)" }}>{user.email}</span>
          </div>

          <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Role</span>
            <span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
              {user.role}
            </span>
          </div>

          <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Registered</span>
            <span style={{ fontWeight: 500, color: "var(--text-color)" }}>{new Date(user.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
            
        <div className="modal-actions" style={{ marginTop: "24px" }}>
          <button
            className="save-btn"
            style={{ width: "100%", padding: "12px", borderRadius: "12px", fontSize: "1rem" }}
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