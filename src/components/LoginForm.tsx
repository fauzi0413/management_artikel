"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

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
    <form
      className="post-form"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        className="post-input"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="post-input"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

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
  );
}