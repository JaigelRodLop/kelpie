import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ENDPOINTS from "../config";
import Loader from "./Loader";

export default function DashboardTecnico() {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  // 🔹 Obtener tickets asignados
  useEffect(() => {
    if (!user?.token) return;

    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(ENDPOINTS.tecnico.tickets, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) throw new Error("Error al obtener tickets");
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  // 🔹 Cambiar estado de ticket
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(ENDPOINTS.tecnico.update(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Error al actualizar ticket");
      const updated = await res.json();
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Obtener comentarios
  const fetchComments = async (ticketId) => {
    try {
      const res = await fetch(ENDPOINTS.tecnico.comments(ticketId), {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Error al obtener comentarios");
      const data = await res.json();
      setComments((prev) => ({
        ...prev,
        [ticketId]: Array.isArray(data) ? data : [],
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Añadir comentario
  const addComment = async (ticketId) => {
    try {
      const res = await fetch(ENDPOINTS.tecnico.comments(ticketId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (!res.ok) throw new Error("Error al añadir comentario");
      const data = await res.json();
      setComments((prev) => ({
        ...prev,
        [ticketId]: [...(prev[ticketId] || []), data],
      }));
      setNewComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  let content;
  if (loading) {
    content = <Loader />;
  } else if (tickets.length === 0) {
    content = <p className="text-gray-400">No tienes tickets asignados.</p>;
  } else {
    content = (
      <ul className="space-y-4">
        {tickets.map((t) => (
          <li
            key={t.id}
            className="bg-gray-800 text-white p-4 rounded shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{t.title}</p>
                <p className="text-sm">Estado: {t.status}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleStatusChange(t.id, "Pendiente")}
                  className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                >
                  Pendiente
                </button>
                <button
                  onClick={() => handleStatusChange(t.id, "En progreso")}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  En progreso
                </button>
                <button
                  onClick={() => handleStatusChange(t.id, "Resuelto")}
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                >
                  Resuelto
                </button>
              </div>
            </div>

            {/* 🔹 Comentarios */}
            <div className="mt-4">
              <button
                onClick={() => fetchComments(t.id)}
                className="text-sm text-blue-400 underline"
              >
                Ver comentarios
              </button>
              <ul className="mt-2 space-y-2">
                {(comments[t.id] || []).map((c) => (
                  <li key={c.id} className="text-sm text-gray-300">
                    {c.content}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Añadir comentario..."
                  className="flex-1 px-2 py-1 rounded text-black"
                />
                <button
                  onClick={() => addComment(t.id)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  Añadir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Panel Técnico</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {content}
    </div>
  );
}
