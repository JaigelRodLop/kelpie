import { useEffect, useState, useContext } from "react";
import ENDPOINTS from "../config";
import { UserContext } from "../context/UserContext";
import Comments from "./Comments";

export default function Tickets() {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user?.token) return;

    let url;
    if (user.role === "admin") {
      url = ENDPOINTS.admin.tickets;
    } else if (user.role === "tecnico") {
      url = ENDPOINTS.tecnico.tickets;
    } else {
      url = ENDPOINTS.cliente.tickets;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then(setTickets)
      .catch((err) => console.error(err));
  }, [user]);

  const crearTicket = async (e) => {
    e.preventDefault();
    if (user.role !== "usuario") return;

    const res = await fetch(ENDPOINTS.cliente.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const nuevo = await res.json();
    setTickets((prev) => [...prev, nuevo]);
    setTitle("");
    setDescription("");
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    if (user.role !== "tecnico") return;

    await fetch(ENDPOINTS.tecnico.update(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
      {user.role === "usuario" && (
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

      {/* Lista de tickets con comentarios */}
      <ul>
        {tickets.map((t) => (
          <li key={t.id} className="mb-4 border p-4 rounded bg-gray-50">
            <strong>{t.title}</strong> — {t.status}
            {user.role === "admin" && (
              <span className="ml-2 text-sm text-gray-600">
                Cliente: {t.owner?.email} | Técnico: {t.tecnico?.email}
              </span>
            )}
            {user.role === "tecnico" && (
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

            {/* Aquí se integran los comentarios */}
            <Comments ticketId={t.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
