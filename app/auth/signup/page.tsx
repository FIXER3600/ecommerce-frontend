"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CLIENT" | "SELLER">("CLIENT");
  const [storeName, setStoreName] = useState("");

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  try {
    const result = await apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, storeName }),
    });

    if (!result?.token) {
      throw new Error("Token não retornado pelo servidor");
    }

    document.cookie = `token=${result.token.token}; path=/; secure; samesite=strict`;
    localStorage.setItem("role", role);
    if (result.token.sellerId) {
      localStorage.setItem("sellerId", result.token.sellerId);
    }
    window.location.href = "/";
  } catch (err: any) {
    alert("Erro ao cadastrar: " + err.message);
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
        Cadastro
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
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
          required
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <label style={{ fontSize: "0.95rem", color: "#374151" }}>
            <input
              type="radio"
              name="role"
              value="CLIENT"
              checked={role === "CLIENT"}
              onChange={() => setRole("CLIENT")}
              style={{ marginRight: "0.5rem" }}
            />
            Cliente
          </label>
          <label style={{ fontSize: "0.95rem", color: "#374151" }}>
            <input
              type="radio"
              name="role"
              value="SELLER"
              checked={role === "SELLER"}
              onChange={() => setRole("SELLER")}
              style={{ marginRight: "0.5rem" }}
            />
            Vendedor
          </label>
        </div>
          {role === "SELLER" && (
               <input
          type="text"
          placeholder="Nome da loja"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />
          )}
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
          Cadastrar
        </button>
      </form>
    </div>
  );
}
