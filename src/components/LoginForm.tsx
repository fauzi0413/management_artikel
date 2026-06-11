"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
    ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
        const result = await signIn(
        "credentials",
        {
            email,
            password,
            redirect: false,
        }
        );

        if (result?.error) {
        setError("Email atau password salah");
        return;
        }

        router.push("/");
        router.refresh();
    } finally {
        setLoading(false);
    }
    }

  return (
    <>
    <form
      className="post-form"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        className="post-input"
        value={email}
        required
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <div className="password-wrapper">
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="post-input"
        value={password}
        required
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
      <button
          type="button"
          className="password-toggle"
          onClick={() =>
          setShowPassword(
              !showPassword
          )
          }
      >
          {showPassword ? (
          <FaEyeSlash />
          ) : (
          <FaEye />
          )}
      </button>
      </div>
      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      <button
        className="post-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Please wait..." : "Login"}
      </button>
    </form>
    <p className="auth-link">
    Don&apos;t have an account?{" "}
    <Link href="/register">
        Register
    </Link>
    </p>
    </>
  );
}