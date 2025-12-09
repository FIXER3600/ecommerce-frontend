"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    apiFetch(`/products/${id}`, { method: "GET" }, token)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";

    try {
      await apiFetch(
        `/products/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(product),
        },
        token
      );
      alert("Produto atualizado com sucesso!");
      router.push(`/products/${id}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    }
  }

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          fontSize: "1.1rem",
          color: "#374151",
        }}
      >
        Carregando...
      </div>
    );

  if (!product)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          fontSize: "1.1rem",
          color: "#dc2626",
        }}
      >
        Produto não encontrado
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "500px",
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
        Editar Produto
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Nome"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />

        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Descrição"
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
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          placeholder="Preço"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            outline: "none",
          }}
        />

        <input
          type="text"
          value={product.imageUrl || ""}
          onChange={(e) =>
            setProduct({ ...product, imageUrl: e.target.value })
          }
          placeholder="URL da imagem"
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
          value={product.stock}
          onChange={(e) =>
            setProduct({ ...product, stock: Number(e.target.value) })
          }
          placeholder="Quantidade em estoque"
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
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
