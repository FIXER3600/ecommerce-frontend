"use client";

import ProductCard from "@/components/ProductCard";
import { apiFetch } from "@/lib/api";
import { ProductResponse } from "@/types/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductResponse | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const sellerId = localStorage.getItem("sellerId"); 

    let url = "/products";
    if (role === "SELLER" && sellerId) {
      url = `/products?sellerId=${sellerId}`;
    }

    apiFetch(url)
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "1rem",
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
        Catálogo
      </h1>
      <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  }}
>
  {products?.items && products.items.length > 0 ? (
    products.items.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  ) : (
    <p
      style={{
        fontSize: "1.1rem",
        color: "#6b7280",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      Ainda não foram adicionados produtos.
    </p>
  )}
</div>
    </div>
  );
}
