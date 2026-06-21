import { useEffect, useState } from "react";

export default function DashboardTecnico() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://kelpie-q2uc.onrender.com/tickets/asignados", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTickets);
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem("token");
    await fetch(`https://kelpie-q2uc.onrender.com/tickets/${id}`, {
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
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Panel de Técnico</h1>
      <ul>
        {tickets.map((t) => (
          <li key={t.id} className="mb-4">
            {t.title} - Estado: {t.status}
            <button
              onClick={() => cambiarEstado(t.id, "resuelto")}
              className="ml-4 bg-green-600 px-2 py-1 rounded"
            >
              Marcar como resuelto
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
