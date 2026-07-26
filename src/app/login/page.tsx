import LoginForm from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="BrozyNews Logo" className="auth-logo" />
          <h1>Selamat Datang</h1>
          <p>Silakan masuk ke akun Anda untuk melanjutkan</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}