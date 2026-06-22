import { useState, useEffect } from "react";

export default function DashboardTecnico() {
  // ✅ Inicializa con datos simulados directamente
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Instalación de impresora", status: "Pendiente" },
    { id: 2, subject: "Actualización de Windows", status: "En progreso" },
    { id: 3, subject: "Problema de red", status: "Resuelto" },
  ]);

  // ✅ useEffect solo para lógica externa (ej. fetch al backend)
  useEffect(() => {
    // Aquí luego reemplazas con fetch al backend usando el token
    // Ejemplo:
    // fetch(ENDPOINTS.tickets.assigned, { headers: { Authorization: `Bearer ${token}` } })
    //   .then(res => res.json())
    //   .then(data => setTickets(data));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Panel Técnico</h1>

      <h2 className="text-xl font-semibold mb-4">Tickets asignados</h2>
      <ul className="space-y-4">
        {tickets.map((t) => (
          <li
            key={t.id}
            className="bg-gray-800 text-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{t.subject}</p>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
