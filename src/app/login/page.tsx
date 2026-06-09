import LoginForm from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="main-heading">
      <h1>Login</h1>

      <LoginForm />
    </div>
  );
}