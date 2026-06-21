import { useEffect, useState } from "react";
import { ENDPOINTS } from "../config";

export default function DashboardTecnico() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(ENDPOINTS.tecnico.tickets, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTickets);
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");
    await fetch(`${ENDPOINTS.tecnico.tickets}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: nuevoEstado }),
    });
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nuevoEstado } : t))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Técnico</h1>
      <ul>
        {tickets.map((t) => (
          <li key={t.id} className="mb-2">
            {t.title} - {t.status}
            <button
              onClick={() => cambiarEstado(t.id, "en proceso")}
              className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
            >
              En proceso
            </button>
            <button
              onClick={() => cambiarEstado(t.id, "resuelto")}
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
            >
              Resuelto
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
