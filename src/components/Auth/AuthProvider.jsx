import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    accessToken: null,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (userInfo) {
        setAuthState(userInfo);
      }
    }
  }, []);

  function login(userData) {
    setAuthState({
      user: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        admin: userData.admin,
      },
      isAuthenticated: true,
      accessToken: userData.accessToken,
    });
    // Set the local storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          admin: userData.admin,
        },
        isAuthenticated: true,
        accessToken: userData.accessToken,
      })
    );
  }

  async function logout() {
    setAuthState({
      user: null,
      isAuthenticated: false,
      accessToken: null,
    });
    // Remove user data from local storage
    localStorage.removeItem("user");
    await queryClient.removeQueries({ queryKey: ["cart"] });
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
