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
      await apiFetch(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
      }, token);
      alert("Produto atualizado com sucesso!");
         router.push(`/products/${id}`);

    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Nome"
        />
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Descrição"
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          placeholder="Preço"
        />
        <input
          type="text"
          value={product.imageUrl || ""}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          placeholder="URL da imagem"
        />
        <input
          type="number"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
          placeholder="Quantidade em estoque"
        />
        <button type="submit" style={{ backgroundColor: "#0070f3", color: "#fff", padding: "0.75rem", borderRadius: "6px" }}>
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
