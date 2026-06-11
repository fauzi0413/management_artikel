"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (
        password !==
        confirmPassword
    ) {
        setError(
        "Password confirmation does not match"
        );

        setLoading(false);

        return;
    }

    try {
      const response =
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "user",
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to register"
        );
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setError(
        "Something went wrong"
      );
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
        type="text"
        placeholder="Full Name"
        className="post-input"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="post-input"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <div className="password-wrapper">
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="post-input"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        required
        minLength={6}
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

      <div className="password-wrapper">
        <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password"
        className="post-input"
        value={confirmPassword}
        onChange={(e) =>
            setConfirmPassword(
            e.target.value
            )
        }
        required
        />
        <button
            type="button"
            className="password-toggle"
            onClick={() =>
            setShowConfirmPassword(
                !showConfirmPassword
            )
            }
        >
            {showConfirmPassword ? (
            <FaEyeSlash />
            ) : (
            <FaEye />
            )}
        </button>
      </div>
 
        {
            confirmPassword &&
            password !== confirmPassword && (
                <p
                style={{
                    color: "red",
                }}
                >
                Passwords do not match
                </p>
            )
        }

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
        disabled={loading || password !== confirmPassword}
      >
        {loading
          ? "Please wait..."
          : "Register"}
      </button>
    </form>
    <p className="auth-link">
    Already have an account?{" "}
    <Link href="/login?register=true">
        Login
    </Link>
    </p>
    </>
  );
}