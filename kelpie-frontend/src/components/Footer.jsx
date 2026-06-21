export default function Footer() {
  const role = localStorage.getItem("role");

  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      <p>Kelpie © 2026</p>
      {role === "admin" && (
        <p className="text-sm text-gray-600">
          Acceso completo al sistema de gestión.
        </p>
      )}
      {role === "tecnico" && (
        <p className="text-sm text-gray-600">
          Panel de soporte técnico: seguimiento de tickets asignados.
        </p>
      )}
      {role === "usuario" && (
        <p className="text-sm text-gray-600">
          Panel de cliente: crea y sigue tus tickets.
        </p>
      )}
    </footer>
  );
}
