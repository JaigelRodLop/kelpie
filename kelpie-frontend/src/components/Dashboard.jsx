import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a Kelpie</h1>
      <p className="mb-6 text-gray-600">Selecciona una opción para continuar:</p>
      <nav className="flex gap-4">
        <Link to="/tickets" className="bg-blue-500 text-white px-4 py-2 rounded">
          Ver Tickets
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
}
