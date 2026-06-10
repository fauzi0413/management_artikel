import React from "react";
import { APP_VERSION } from "@/lib/version";

function Page() {
  return (
    <div className="main-heading">
      <h1>About NextJS News</h1>

      <p className="subtitle">
        NextJS News is a modern article platform built with Next.js,
        TypeScript, PostgreSQL, Prisma, and NextAuth. The platform allows
        users to discover, create, manage, and share articles related to
        web development, programming, software engineering, and emerging
        technologies.
      </p>

      <p>
        Our goal is to provide a simple and accessible space where developers
        can learn new skills, explore technical insights, and stay updated
        with the latest trends in the technology industry. Whether you are a
        beginner starting your programming journey or an experienced developer
        looking for practical knowledge, NextJS News is designed to support
        continuous learning and knowledge sharing.
      </p>

      <div className="about-version">
        <h3>Version Information</h3>
        <p>
          Current Version: <strong>v{APP_VERSION}</strong>
        </p>
        <p>
          Last Updated: June 2026
        </p>
      </div>
    </div>
  );
}

export default Page;