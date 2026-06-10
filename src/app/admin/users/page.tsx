import { prisma } from "@/lib/prisma";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/Pagination";
import UserTable from "@/components/UserTable";
import CreateUserButton from "@/components/CreateUserButton";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function AdminUsersPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const page = Number(
    params.page || 1
  );

  const search =
    params.search || "";

  const limit = 10;

  const skip = (page - 1) * limit;

  const totalUsers =
    await prisma.user.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

  const totalPages = Math.ceil(
    totalUsers / limit
  );

  const users =
    await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    });

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Manage Users</h1>
        </div>
        <CreateUserButton />
      </div>

      <SearchForm
        initialSearch={search}
        basePath="/admin/users"
      />

      <div className="table-card">
        {users.length === 0 ? (
          <div className="empty-state">
            <h3>No Users Found</h3>

            <p>
              No users match your
              search.
            </p>
          </div>
        ) : (
          <>
            <UserTable
              users={users}
              skip={skip}
            />

            <Pagination
              page={page}
              totalPages={
                totalPages
              }
              basePath="/admin/users"
              search={search}
            />
          </>
        )}
      </div>
    </div>
  );
}