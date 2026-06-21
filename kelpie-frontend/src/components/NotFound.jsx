import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">Página no encontrada</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
        Volver al inicio
      </Link>
    </div>
  );
}
