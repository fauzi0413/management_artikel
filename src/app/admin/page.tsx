import { prisma } from "@/lib/prisma";

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

  prisma.user.count({
    where: {
      role: "admin",
    },
  }),

  prisma.post.findMany({
    take: 3,
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  }),

  prisma.user.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  }),

  await prisma.post.count({
    where: {
      createdAt: {
        gte: new Date(
          new Date().setHours(
            0,
            0,
            0,
            0
          )
        ),
      },
    },
    })
]);

export default async function AdminPage() {
  const [
    totalUsers,
    totalPosts,
    totalAdmins,
    recentPosts,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.post.count(),

    prisma.user.count({
      where: {
        role: "admin",
      },
    }),

    prisma.post.findMany({
      take: 3,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.user.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>

      <p className="dashboard-subtitle">
        Monitor users, posts, and platform activity.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <span>{totalUsers}</span>
        </div>

        <div className="stat-card">
          <h3>Total Posts</h3>
          <span>{totalPosts}</span>
        </div>

        <div className="stat-card">
          <h3>Total Admins</h3>
          <span>{totalAdmins}</span>
        </div>

        <div className="stat-card">
          <h3>Posts Today</h3>
          <span>{postToday}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Posts</h2>

          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="activity-item"
            >
              <h4>{post.title}</h4>

              <p>
                by {post.user?.name}
              </p>

              <small>
                {new Date(
                  post.createdAt
                ).toLocaleDateString("id-ID")}
              </small>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <h2>Recent Users</h2>

          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="activity-item"
            >
              <h4>{user.name}</h4>

              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}