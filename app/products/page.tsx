"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      await apiFetch(
        "/products",
        {
          method: "POST",
          body: JSON.stringify({ name, price, description, imageUrl }),
        },
        token
      );

      alert("Produto criado com sucesso!");
      setName("");
      setPrice(0);
      setDescription("");
      setImageUrl("");
    } catch (err) {
      alert("Erro ao criar produto");
    }
  }

  async function handleUploadCsv(e: React.FormEvent) {
    e.preventDefault();
    if (!csvFile) return alert("Selecione um arquivo CSV");

    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      formData.append("file", csvFile);

      await apiFetch("/products/upload-csv", { method: "POST", body: formData }, token);

      alert("CSV enviado e produtos cadastrados com sucesso!");
      setCsvFile(null);
    } catch (err: any) {
      alert("Erro ao enviar CSV: " + err.message);
    }
  }

  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Criar Produto</h1>
      <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px]"
        />

        <input
          type="url"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-3 rounded-md text-base font-semibold shadow-md"
        >
          Criar Produto
        </button>
      </form>

      <hr className="my-8 border-gray-300" />

      <h2 className="text-xl font-bold mb-4 text-center text-green-700">Upload de CSV</h2>
      <form onSubmit={handleUploadCsv} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
          className="p-2 rounded-md border border-gray-300 text-base"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-3 rounded-md text-base font-semibold shadow-md"
        >
          Enviar CSV
        </button>
      </form>
    </div>
  );
}
