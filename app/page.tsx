"use client";

import ProductCard from "@/components/ProductCard";
import { apiFetch } from "@/lib/api";
import { ProductResponse } from "@/types/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductResponse | null>(null);
  useEffect(() => {
    apiFetch("/products").then(setProducts).catch(console.error);    
  }, []);

  return (
    <div>
      <h1>Catálogo</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products?.items.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}
