import { useEffect, useState } from "react";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://kelpie-q2uc.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUsers);

    fetch("https://kelpie-q2uc.onrender.com/tickets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTickets);
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>

      <h2 className="text-xl mb-2">Usuarios</h2>
      <ul className="mb-6">
        {users.map((u) => (
          <li key={u.id}>{u.first_name} {u.last_name} - {u.role}</li>
        ))}
      </ul>

      <h2 className="text-xl mb-2">Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.id}>{t.title} - {t.status}</li>
        ))}
      </ul>
    </div>
  );
}
