import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Kelpie</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/tickets" className="hover:underline">Tickets</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}
