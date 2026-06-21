import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

import Login from "./components/Login";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardTecnico from "./components/DashboardTecnico";
import DashboardCliente from "./components/DashboardCliente";
import Tickets from "./components/Tickets";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const role = user?.role;

  // ✅ Lógica de redirección clara
  let redirectElement;
  if (!token) {
    redirectElement = <Navigate to="/login" />;
  } else if (role === "admin") {
    redirectElement = <Navigate to="/admin" />;
  } else if (role === "tecnico") {
    redirectElement = <Navigate to="/tecnico" />;
  } else if (role === "cliente") {
    redirectElement = <Navigate to="/cliente" />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Ruta raíz */}
            <Route path="/" element={redirectElement} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboards por rol */}
            <Route
              path="/admin"
              element={
                token && role === "admin" ? <DashboardAdmin /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/tecnico"
              element={
                token && role === "tecnico" ? <DashboardTecnico /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/cliente"
              element={
                token && role === "cliente" ? <DashboardCliente /> : <Navigate to="/login" />
              }
            />

            {/* Tickets */}
            <Route
              path="/tickets"
              element={token ? <Tickets /> : <Navigate to="/login" />}
            />

            {/* Página no encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
