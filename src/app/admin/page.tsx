import { prisma } from "@/lib/prisma";
import { FaUsers, FaFileAlt, FaUserShield, FaCalendarDay } from "react-icons/fa";

export default async function AdminPage() {
  const [
    totalUsers,
    totalPosts,
    totalAdmins,
    recentPosts,
    recentUsers,
    postToday,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.user.count({ where: { role: "admin" } }),
    prisma.post.findMany({
      take: 5,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    })
  ]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of system statistics and recent platform activities.</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card blue">
          <div className="stat-icon-wrapper">
            <FaUsers className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <span>{totalUsers}</span>
          </div>
        </div>

        <div className="admin-stat-card green">
          <div className="stat-icon-wrapper">
            <FaFileAlt className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Posts</h3>
            <span>{totalPosts}</span>
          </div>
        </div>

        <div className="admin-stat-card purple">
          <div className="stat-icon-wrapper">
            <FaUserShield className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Admins</h3>
            <span>{totalAdmins}</span>
          </div>
        </div>

        <div className="admin-stat-card orange">
          <div className="stat-icon-wrapper">
            <FaCalendarDay className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Posts Today</h3>
            <span>{postToday}</span>
          </div>
        </div>
      </div>

      <div className="admin-content-grid">
        <div className="admin-section">
          <div className="section-title-wrapper">
            <h2>Recent Posts</h2>
            <div className="badge">{recentPosts.length} New</div>
          </div>
          <div className="admin-list">
            {recentPosts.map((post) => (
              <div key={post.id} className="admin-list-item">
                <div className="item-content">
                  <h4>{post.title}</h4>
                  <p>by <strong>{post.user?.name || "Unknown"}</strong></p>
                </div>
                <div className="item-meta">
                  <small>{new Date(post.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <div className="section-title-wrapper">
            <h2>Recent Users</h2>
            <div className="badge">{recentUsers.length} New</div>
          </div>
          <div className="admin-list">
            {recentUsers.map((user) => (
              <div key={user.id} className="admin-list-item">
                <div className="item-content">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div className="item-meta">
                  <span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}