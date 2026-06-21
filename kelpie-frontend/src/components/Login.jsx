import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ENDPOINTS from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ Si ya hay sesión, no mostrar login
  if (user?.token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(ENDPOINTS.auth.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas");

      const data = await response.json();

      const userData = {
        token: data.access_token,
        role: data.role,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
      };

      setUser(userData);
      Object.entries(userData).forEach(([key, value]) =>
        localStorage.setItem(key, value)
      );

      // ✅ Redirección según rol
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "tecnico") {
        navigate("/tecnico");
      } else {
        navigate("/cliente");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Iniciar sesión</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
