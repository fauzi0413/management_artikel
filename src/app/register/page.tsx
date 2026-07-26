import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="BrozyNews Logo" className="auth-logo" />
          <h1>Buat Akun Baru</h1>
          <p>Bergabunglah dengan komunitas pembaca BrozyNews</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}