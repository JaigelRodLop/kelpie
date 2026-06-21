import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import ENDPOINTS from "../config";
import Loader from "./Loader";
import { UserContext } from "../context/UserContext";

export default function Comments({ ticketId }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.token || !ticketId) return;

    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(ENDPOINTS.tecnico.comments(ticketId), {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) throw new Error("Error al obtener comentarios");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [ticketId, user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetch(ENDPOINTS.cliente.comments(ticketId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Error al crear comentario");
      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 border rounded mt-4 bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Comentarios</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <>
          {user?.role === "usuario" && (
            <form onSubmit={handleCreate} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Escribe un comentario..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 flex-1 rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Enviar
              </button>
            </form>
          )}

          <ul className="space-y-2">
            {comments.map((c) => (
              <li key={c.id} className="border p-2 rounded bg-white">
                <strong>{c.author?.email || "Anónimo"}:</strong> {c.content}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

Comments.propTypes = {
  ticketId: PropTypes.number.isRequired,
};
