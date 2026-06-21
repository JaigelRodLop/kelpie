import { useEffect, useState } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5173/tickets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      <ul className="space-y-2">
        {tickets.map((t) => (
          <li key={t.id} className="border p-2 rounded">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
