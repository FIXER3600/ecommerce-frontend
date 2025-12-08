"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"SELLER" | "CLIENT" | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "SELLER" || storedRole === "CLIENT") {
      setRole(storedRole);
    } else {
      setRole(null);
    }

    async function fetchProduct() {
      try {
        const token = localStorage.getItem("token") || "";
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar produto");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  async function handleAddToCart() {
    const token = localStorage.getItem("token") || "";
    try {
      await fetch(`http://localhost:3000/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });
      alert("Produto adicionado ao carrinho!");
    } catch (err) {
      alert("Erro ao adicionar ao carrinho");
      console.error(err);
    }
  }

  function handleAction() {
    if (role === "CLIENT") {
      handleAddToCart();
    } else if (role === "SELLER") {
      router.push(`/products/${id}/edit`);
    }
  }

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Carregando...</div>;
  }

  if (!product) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "#dc2626" }}>Produto não encontrado</div>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#111827",
        }}
      >
        {product.name}
      </h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        />
      )}

      <p
        style={{
          fontSize: "1.1rem",
          color: "#374151",
          marginBottom: "1rem",
          lineHeight: "1.6",
        }}
      >
        {product.description}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#16a34a",
            marginBottom: "2rem",
          }}
        >
          Preço: R$ {product.price}
        </p>
        <button
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
          }}
          onClick={handleAction}
        >
          {role === "CLIENT" ? "Adicionar ao Carrinho 🛒" : "Editar Produto ✏️"}
        </button>
      </div>
    </div>
  );
}
