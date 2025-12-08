"use client";

import { useState } from "react";

export default function AccountMenu({ role }: { role: "SELLER" | "CLIENT" | null }) {
  const [open, setOpen] = useState(false);

  async function handleAction() {
    const token = localStorage.getItem("token") || "";
    const confirmed = window.confirm(
      role === "CLIENT"
        ? "Tem certeza que deseja excluir sua conta? Seu histórico de compras será mantido."
        : "Tem certeza que deseja desativar sua conta? Seus produtos serão ocultados da loja."
    );
    if (!confirmed) return;

    try {
      if (role === "CLIENT") {
        await fetch("http://localhost:3000/auth/client", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Conta excluída com sucesso!");
      } else {
        await fetch("http://localhost:3000/seller/deactivate", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Conta desativada com sucesso!");
      }
     
    } catch (err) {
      console.error(err);
      alert("Erro ao processar operação");
    }finally {
 window.location.href = "/auth/signin";
    }
  }
  function handleLogout() {
	const confirmed = window.confirm("Tem certeza que deseja sair?");
    	if (!confirmed) return;
	localStorage.removeItem("token");
	window.location.href = "/auth/signin";
  }

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button style={{ background: "transparent", border: "none", cursor: "pointer", color:"#fff", fontSize:"16px" }}>
        ⚙️ Conta
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "0.5rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={handleAction}
            style={{
              backgroundColor: role === "CLIENT" ? "#dc2626" : "#f59e0b",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {role === "CLIENT" ? "Excluir conta" : "Desativar conta"}
          </button>
	  <div style={{margin:"10px"}}>
	  <button
	   onClick={handleLogout}
            style={{
              backgroundColor:  "#dc2626",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
	  >
		Sair
	  </button>
	  </div>
        </div>
      )}
    </div>
  );
}

