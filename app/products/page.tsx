"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      await apiFetch(
        "/products",
        {
          method: "POST",
          body: JSON.stringify({ name, price, description, imageUrl }),
        },
        token
      );

      alert("Produto criado com sucesso!");
      setName("");
      setPrice(0);
      setDescription("");
      setImageUrl("");
    } catch (err) {
      alert("Erro ao criar produto");
    }
  }

  async function handleUploadCsv(e: React.FormEvent) {
    e.preventDefault();
    if (!csvFile) return alert("Selecione um arquivo CSV");

    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      formData.append("file", csvFile);

      const res = await fetch("http://localhost:3000/products/upload-csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao enviar CSV");
      alert("CSV enviado e produtos cadastrados com sucesso!");
      setCsvFile(null);
    } catch (err) {
      alert("Erro ao enviar CSV");
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
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
        Criar Produto
      </h1>
      <form
        onSubmit={handleCreateProduct}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Nome do produto"
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
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
            minHeight: "100px",
          }}
        />

        <input
          type="url"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={{
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
          Criar Produto
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />
      <h2
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#189A52",
          textAlign: "center",
        }}
      >
        Upload de CSV
      </h2>
      <form
        onSubmit={handleUploadCsv}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
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
          Enviar CSV
        </button>
      </form>
    </div>
  );
}
