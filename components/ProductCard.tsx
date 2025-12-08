"use client";

import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
	const [favorited, setFavorited] = useState(product.isFavorited);
  const [role, setRole] = useState<"SELLER" | "CLIENT" | null>(null);
  const token = localStorage.getItem("token") || "";
  useEffect(() => {
    setFavorited(favorited);
  }, [favorited]);
  
  useEffect(() => {
   const storedRole = localStorage.getItem("role");
  if (storedRole === "SELLER" || storedRole === "CLIENT") {
    setRole(storedRole); 
  } else {
    setRole(null);
  }
  }, []);

  async function removeProduct() {
    try {
         const confirmed = window.confirm("Tem certeza que deseja remover este produto?");
    if (!confirmed) return;

    await apiFetch(`/products/${product.id}`, { method: "DELETE" }, token);

    alert("Produto removido com sucesso!");
    window.location.reload();
    } catch (err) {
       console.error(err);
      alert("Erro ao remover favorito");
    }
  }

  async function handleFavorite() {

    try {
      if (!favorited) {
        await apiFetch("/customer/favorites", {
          method: "POST",
          body: JSON.stringify({ productId: product.id }),
        }, token);
      } else {
        await apiFetch(`/customer/favorites/${product.id}`, {
          method: "DELETE",
        }, token);
      }
      setFavorited(!favorited);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar favoritos");
    }
  }


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



  return (
    <div  style={{
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    margin: "0.5rem",
    width: "220px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  }}
>
  {role === "CLIENT" ? (
     <button
        onClick={handleFavorite}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          color: favorited ? "red" : "white", 
          textShadow: "0 0 2px black", 
        }}
        title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        ♥
      </button>):(<button
       style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          color: "red" ,
          textShadow: "0 0 2px black",
        }}
        onClick={removeProduct}
      >
        🗑️
      </button>)}
      

      {product.imageUrl  && (
        <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "4px" }} />
      )}
      <h3 style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>{product.name}</h3>
      <p style={{ fontWeight: "bold", color: "#333" }}>{formatPrice(Number(product.price))}</p>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <Link
          href={`/products/${product.id}`}
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor: "#189A52",
            color: "#fff",
            textAlign: "center",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Ver detalhes
        </Link>
          {role === "CLIENT" && (
        <button
          onClick={handleAddToCart}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#189A52",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
          title="Adicionar ao carrinho"
        >
          🛒
        </button>)}
      </div>
    </div>
  );
}
