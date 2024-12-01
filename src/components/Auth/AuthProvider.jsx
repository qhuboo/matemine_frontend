import { createContext, useState } from "react";

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
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        admin: userData.admin,
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
