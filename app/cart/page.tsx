"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token") || "");
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    async function loadCart() {
    try {
      const data = await apiFetch("/cart", {}, token);
      setCart(data);
    } catch (err: any) {
      setError(err.message);
    }
  }


    loadCart();
  }, [token]);

  async function handleCheckout() {
    try {
      const res = await apiFetch("/orders/checkout", { method: "POST" }, token);
      if (!res.ok) throw new Error(`Erro ao finalizar compra: ${res.status}`);
      await res.json();
      alert("Compra finalizada com sucesso!");
      setCart({ ...cart, items: [] });
    } catch (err: any) {
      alert("Erro ao finalizar compra: " + err.message);
    }
  }

  async function removeAll() {
    if (!cart?.items?.length) return;
    if (!window.confirm("Tem certeza que deseja limpar o carrinho?")) return;

    try {
      await apiFetch("/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart({ ...cart, items: [] });
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleRemoveItem(productId: string) {
    if (!window.confirm("Tem certeza que deseja remover este item?")) return;

    try {
      const res = await apiFetch(`/cart/items/${productId}`, { method: "DELETE" }, token);

      if (!res.ok) throw new Error("Erro ao remover item");

      setCart((prev: any) => ({
        ...prev,
        items: prev.items.filter((item: any) => item.productId !== productId),
      }));
    } catch (err: any) {
      alert(err.message);
    }
  }

  function calcularTotal() {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce(
      (acc: number, item: any) =>
        acc + Number(item.product?.price || 0) * item.quantity,
      0
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "2rem auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <div style={{ flex: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h1>Meu Carrinho</h1>
            <button
              style={{
                backgroundColor: "#189A52",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onClick={removeAll}
            >
              Limpar Carrinho
            </button>
          </div>

          {error && <p style={{ color: "red" }}>Erro: {error}</p>}

          {cart?.items?.length ? (
            cart.items.map((item: any) => (
              <div
                key={item.productId}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={item.product?.imageUrl || ""}
                  alt={item.product?.name || "Produto"}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "1rem",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "#189A52" }}>
                    {item.product?.name}
                  </h3>
                  <p style={{ margin: "0 0 0.5rem 0", color: "#555" }}>
                    {item.product?.description}
                  </p>
                  <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
                    Preço: R$ {item.product?.price}
                  </p>
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    alignSelf: "center",
                  }}
                >
                  Remover
                </button>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </div>
        {cart?.items?.length ? (
          <div
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              position: "sticky",
              top: "2rem",
              height: "fit-content",
            }}
          >
            <h2 style={{ marginBottom: "1rem", color: "#189A52" }}>
              Resumo da Compra
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Total: R$ {calcularTotal().toFixed(2)}
            </p>
            <button
              style={{
                backgroundColor: "#189A52",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                width: "100%",
              }}
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
