"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import UserDetailModal from "./UserDetailModal";

export default function UserTable({
  users,
  skip,
}: any) {
  const [selectedUser, setSelectedUser] =
    useState(null);

  return (
    <>
      <table className="posts-table">
        <thead>
          <tr>
            <th>No</th>
            <th className="mobile-hide">Name</th>
            <th>Email</th>
            <th className="mobile-hide">Role</th>
            <th>Detail</th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (user: any, index: number) => (
              <tr key={user.id}>
                <td>
                  {skip + index + 1}
                </td>

                <td className="user-name mobile-hide">
                  {user.name}
                </td>

                <td className="user-email">
                  {user.email}
                </td>

                <td className="user-role mobile-hide">
                  <span
                      className={`role-badge ${
                      user.role === "admin"
                          ? "role-admin"
                          : "role-user"
                      }`}
                  >
                      {user.role}
                  </span>
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedUser(
                        user
                      )
                    }
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() =>
            setSelectedUser(null)
          }
        />
      )}
    </>
  );
}