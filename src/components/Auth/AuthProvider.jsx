import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    token: null,
  });

  function login(userData, token) {
    setAuthState({
      user: {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      },
      isAuthenticated: true,
      token,
    });
    // Something about localStorage
  }

  function logout() {
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
    });
    // Something about localStorage
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
