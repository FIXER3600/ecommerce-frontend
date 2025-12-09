"use client";

import { apiFetch } from "@/lib/api";
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
        const data = await apiFetch(`/products/${id}`, {}, token);
        setProduct(data);
      } catch (err: any) {
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
      await apiFetch(
        "/cart/items",
        {
          method: "POST",
          body: JSON.stringify({ productId: product.id, quantity: 1 }),
        },
        token
      );
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
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-700">
        Carregando...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-600">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-h-[450px] object-cover rounded-lg mb-6 shadow-md"
        />
      )}

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {product.description}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-green-600">
          Preço: R$ {product.price}
        </p>
        <button
          onClick={handleAction}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-lg font-medium shadow-md"
        >
          {role === "CLIENT" ? "Adicionar ao Carrinho 🛒" : "Editar Produto ✏️"}
        </button>
      </div>
    </div>
  );
}
