import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();

    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <span className="font-bold">Kelpie</span>
      {user ? (
        <div>
          Hola, {user.firstName} {user.lastName} ({user.role})
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <span>No autenticado</span>
      )}
    </nav>
  );
}
