import { useEffect, useState } from "react";
import { ENDPOINTS } from "../config";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    let url;
    if (role === "admin") {
      url = ENDPOINTS.admin.tickets;
    } else if (role === "tecnico") {
      url = ENDPOINTS.tecnico.tickets;
    } else {
      url = ENDPOINTS.cliente.tickets;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTickets)
      .catch((err) => console.error(err));
  }, [role, token]);

  const crearTicket = async (e) => {
    e.preventDefault();
    if (role !== "usuario") return; // solo clientes crean tickets

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

  const cambiarEstado = async (id, nuevoEstado) => {
    if (role !== "tecnico") return; // solo técnicos cambian estado

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
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      {/* Formulario solo para clientes */}
      {role === "usuario" && (
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
      )}

      {/* Lista de tickets */}
      <ul>
        {tickets.map((t) => (
          <li key={t.id} className="mb-2 border p-2 rounded">
            <strong>{t.title}</strong> — {t.status}
            {role === "admin" && (
              <span className="ml-2 text-sm text-gray-600">
                Cliente: {t.owner?.email} | Técnico: {t.tecnico?.email}
              </span>
            )}
            {role === "tecnico" && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => cambiarEstado(t.id, "en proceso")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  En proceso
                </button>
                <button
                  onClick={() => cambiarEstado(t.id, "resuelto")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Resuelto
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
