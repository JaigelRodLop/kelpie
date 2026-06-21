import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Kelpie</h1>
      <div className="flex gap-4 items-center">
        {!token && <Link to="/login">Login</Link>}

        {token && role === "admin" && (
          <>
            <Link to="/admin">Panel Admin</Link>
            <Link to="/tickets">Tickets</Link>
          </>
        )}

        {token && role === "tecnico" && (
          <>
            <Link to="/tecnico">Panel Técnico</Link>
            <Link to="/tickets">Tickets</Link>
          </>
        )}

        {token && role === "usuario" && (
          <>
            <Link to="/cliente">Panel Cliente</Link>
            <Link to="/tickets">Mis Tickets</Link>
          </>
        )}

        {token && (
          <>
            <span className="text-sm">
              Hola, {firstName} {lastName}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
