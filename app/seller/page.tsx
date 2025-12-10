"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {
  const token = localStorage.getItem("token") || "";
  const sellerId = localStorage.getItem("sellerId") || "";
  apiFetch(
    "/seller/dashboard",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sellerId }),
    },
    token
  )
    .then(setDashboard)
    .catch(console.error);
}, []);


  if (!dashboard) {

    return <p style={{ textAlign: "center" }}>Carregando dados...</p>;
  }

  const barData = {
    labels: ["Total Vendido", "Receita", "Produtos"],
    datasets: [
      {
        label: "Relação de Valores",
        data: [dashboard.totalSold, dashboard.totalRevenue, dashboard.totalProducts],
        backgroundColor: ["#189A52", "#2196F3", "#FFC107"],
      },
    ],
  };

  const pieData = {
    labels: [dashboard.bestSeller?.name || "Produto", "Outros"],
    datasets: [
      {
        data: [
          dashboard.bestSeller?.totalSold || 0,
          (dashboard.totalSold || 0) - (dashboard.bestSeller?.totalSold || 0),
        ],
        backgroundColor: ["#189A52", "#BDBDBD"],
      },
    ],
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#189A52",
        }}
      >
        Dashboard da Loja
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div>
          <h2 style={{ marginBottom: "1rem", color: "#189A52" }}>Resumo</h2>
          <Bar data={barData} />
        </div>

        <div style={{display:"flex", flexDirection:"column"}}>
          <h2 style={{ marginBottom: "1rem", color: "#189A52", textAlign:"center" }}>Produto Mais Vendido</h2>
          <Pie data={pieData} />
        </div>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center", color: "#374151" }}>
        <p>Loja: {dashboard.storeName}</p>
        <p>Total vendido: {dashboard.totalSold}</p>
        <p>Receita: R$ {dashboard.totalRevenue}</p>
        <p>Quantidade de Produtos cadastrados: {dashboard.totalProducts}</p>
        <p>Produto Mais Vendido: {dashboard.bestSeller?.name}</p>
      </div>
    </div>
  );
}
