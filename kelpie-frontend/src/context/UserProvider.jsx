import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Memoizar para evitar recrear el objeto en cada render
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
