"use client";

import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  role: "SELLER" | "CLIENT";
  iat: number;
  exp: number;
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await apiFetch("/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      document.cookie = `token=${result.token}; path=/; secure; samesite=strict`;
      localStorage.setItem("token", result.token);
      const decoded = jwtDecode<TokenPayload>(result.token);
      localStorage.setItem("role", decoded.role);
      if (result.sellerId) {
      localStorage.setItem("sellerId", result.sellerId);
      }
      window.location.href = "/";
    } catch (err: any) {
      alert("Erro ao entrar: " + err.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#189A52",
        }}
      >
        Entrar
      </h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#189A52",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.75rem",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#157a42")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#189A52")
          }
        >
          Entrar
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center", color: "#555" }}>
        Novo por aqui?{" "}
        <Link href="/auth/signup" style={{ color: "#189A52", fontWeight: "600" }}>
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
