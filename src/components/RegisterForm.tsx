"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Username check state
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameStatus("idle");
      setUsernameSuggestions([]);
      return;
    }

    setUsernameStatus("checking");
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/users/check-username?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        if (data.available) {
          setUsernameStatus("available");
          setUsernameSuggestions([]);
        } else {
          setUsernameStatus("taken");
          setUsernameSuggestions(data.suggestions || []);
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [username]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok");
      setLoading(false);
      return;
    }

    if (usernameStatus === "taken") {
      setError("Username sudah digunakan, pilih username lain");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, username, password, role: "user" }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.suggestions) {
          setUsernameSuggestions(data.suggestions);
          setUsernameStatus("taken");
        }
        setError(data.message || "Gagal mendaftar");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nama Lengkap"
        className="post-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="post-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Username field */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Username (contoh: john123)"
          className="post-input"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
          required
          minLength={3}
          style={{
            borderColor:
              usernameStatus === "available" ? "#22c55e" :
              usernameStatus === "taken" ? "#ef4444" : undefined,
            paddingRight: "40px",
          }}
        />
        {usernameStatus === "checking" && (
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#3b82f6", display: "flex" }}>
            <FaSpinner className="spinner-icon" />
          </span>
        )}
        {usernameStatus === "available" && (
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#22c55e", display: "flex" }}>
            <FaCheckCircle />
          </span>
        )}
        {usernameStatus === "taken" && (
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#ef4444", display: "flex" }}>
            <FaTimesCircle />
          </span>
        )}
      </div>

      {/* Username status message */}
      {usernameStatus === "available" && (
        <p style={{ color: "#22c55e", fontSize: "0.85rem", margin: "-10px 0 0", display: "flex", alignItems: "center", gap: "6px" }}>
          <FaCheckCircle /> Username tersedia
        </p>
      )}
      {usernameStatus === "taken" && (
        <div style={{ margin: "-10px 0 0" }}>
          <p style={{ color: "#ef4444", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <FaTimesCircle /> Username sudah digunakan. Coba salah satu ini:
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
            {usernameSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setUsername(s); setUsernameStatus("idle"); }}
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  border: "1px solid #3b82f6",
                  background: "transparent",
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Kata sandi"
          className="post-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="password-wrapper">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Konfirmasi Kata Sandi"
          className="post-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {confirmPassword && password !== confirmPassword && (
        <p style={{ color: "red", fontSize: "0.85rem" }}>
          Konfirmasi kata sandi tidak cocok
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="post-button"
        type="submit"
        disabled={loading || password !== confirmPassword || usernameStatus === "taken" || usernameStatus === "checking"}
      >
        {loading ? "Tunggu..." : "Daftar"}
      </button>
    </form>
    <p className="auth-link">
      Sudah punya akun?{" "}
      <Link href="/login?register=true">Masuk</Link>
    </p>
    </>
  );
}