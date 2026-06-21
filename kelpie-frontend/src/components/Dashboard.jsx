import Login from "./Login";
import Tickets from "./Tickets";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Login />
      <Tickets />
    </div>
  );
}
