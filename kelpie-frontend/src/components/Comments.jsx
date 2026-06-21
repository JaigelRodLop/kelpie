import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ENDPOINTS } from "../config";
import Loader from "./Loader";

export default function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      try {
        const res = await fetch(ENDPOINTS.comments.list, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener comentarios");
        const data = await res.json();
        setComments(data.filter((c) => c.ticket_id === ticketId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [ticketId, token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(ENDPOINTS.comments.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, ticket_id: ticketId }),
      });
      if (!res.ok) throw new Error("Error al crear comentario");
      const newComment = await res.json();
      setComments([...comments, newComment]);
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
          <form onSubmit={handleCreate} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 flex-1 rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Enviar
            </button>
          </form>

          <ul className="space-y-2">
            {comments.map((c) => (
              <li key={c.id} className="border p-2 rounded bg-white">
                {c.content}
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
