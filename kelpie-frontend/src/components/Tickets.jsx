import { useEffect, useState } from "react";
import { ENDPOINTS } from "../config";
import Comments from "./Comments";
import Loader from "./Loader";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);
      try {
        const res = await fetch(ENDPOINTS.tickets.list, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener tickets");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(ENDPOINTS.tickets.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Error al crear ticket");
      const newTicket = await res.json();
      setTickets([...tickets, newTicket]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tickets</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <Loader />}

      <form onSubmit={handleCreate} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Crear Ticket
        </button>
      </form>

      <ul className="space-y-4">
        {tickets.map((t) => (
          <li key={t.id} className="border p-4 rounded shadow bg-white">
            <strong className="text-lg">{t.title}</strong>
            <p className="text-gray-600">{t.description}</p>
            <span className="text-sm text-gray-400">Estado: {t.status}</span>
            <Comments ticketId={t.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
