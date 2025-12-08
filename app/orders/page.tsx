"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    apiFetch("/orders", {}, token).then(setOrders).catch(console.error);
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#111827",
          textAlign: "center",
        }}
      >
        Meus Pedidos
      </h1>

      {orders.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "1.1rem",
          }}
        >
          Você ainda não possui pedidos.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#189A52", // substituí o azul pelo verde
                }}
              >
                Pedido #{o.id}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Total:{" "}
                <span style={{ fontWeight: "bold", color: "#189A52" }}>
                  R$ {o.totalAmount}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
