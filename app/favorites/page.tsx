"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    apiFetch("/customer/favorites", {}, token).then(setFavorites).catch(console.error);
  }, []);

  async function handleRemoveFavorite(favoriteId: string) {
    const confirmed = window.confirm("Tem certeza que deseja remover este item dos favoritos?");
    if (!confirmed) return;
    try {
      await apiFetch(`/customer/favorites/${favoriteId}`, { method: "DELETE" }, token);
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
    } catch (err: any) {
      alert("Erro ao remover favorito: " + err.message);
    }
  }

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
        Meus Favoritos
      </h1>
      {error && <p style={{ color: "red" }}>Erro: {error}</p>}
      {favorites.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {favorites.map((fav) => (
            <div
              key={fav.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={fav.product?.imageUrl || ""}
                alt={fav.product?.name || "Produto"}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                }}
              />
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "#189A52",
                  }}
                >
                  {fav.product?.name}
                </h3>
                <p style={{ margin: "0 0 0.5rem 0", color: "#555" }}>
                  {fav.product?.description}
                </p>
                <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
                  Preço: R$ {fav.product?.price}
                </p>
                <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>
                  Publicado em:{" "}
                  {new Date(fav.product?.publishedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFavorite(fav.id)}
                style={{
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  marginTop: "auto",
                  alignSelf: "flex-end",
                }}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Você ainda não possui favoritos.
        </p>
      )}
    </div>
  );
}
