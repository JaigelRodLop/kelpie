import { useEffect, useState } from "react";
import { ENDPOINTS } from "../config";

export default function DashboardCliente() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(ENDPOINTS.cliente.tickets, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTickets);
  }, []);

  const crearTicket = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(ENDPOINTS.cliente.tickets, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const nuevo = await res.json();
    setTickets((prev) => [...prev, nuevo]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Cliente</h1>

      <form onSubmit={crearTicket} className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Título del ticket"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descripción del problema"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Crear Ticket
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Mis Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.id}>
            {t.title} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
