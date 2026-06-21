import { useEffect, useState } from "react";

export default function DashboardCliente() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://kelpie-q2uc.onrender.com/tickets/mios", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTickets);
  }, []);

  const crearTicket = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://kelpie-q2uc.onrender.com/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    const nuevo = await res.json();
    setTickets((prev) => [...prev, nuevo]);
    setTitle("");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Panel de Cliente</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Título del ticket"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white mr-2"
        />
        <button
          onClick={crearTicket}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Crear Ticket
        </button>
      </div>

      <h2 className="text-xl mb-2">Mis Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.id}>{t.title} - {t.status}</li>
        ))}
      </ul>
    </div>
  );
}
