import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";
import SessionExpiredDialog from "./SessionExpiredDialog";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => {
    try {
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser;
      }
    } catch (error) {
      console.error("[Auth Init] Parse error:", error);
    }

    return {
      user: null,
      isAuthenticated: false,
      accessToken: null,
    };
  });

  const [isSessionExpiredDialogOpen, setIsSessionExpiredDialogOpen] =
    useState(false);

  const lastTokenUpdateRef = useRef(Date.now());

  // Update local storage when auth state changess
  useEffect(() => {
    if (authState.isAuthenticated) {
      try {
        localStorage.setItem("user", JSON.stringify(authState));
      } catch (error) {
        console.error("[Auth Effect] Failed to write to localStorage:", error);
      }
    } else {
      try {
        localStorage.removeItem("user");
      } catch (error) {
        console.error(
          "[Auth Effect] Failed to remove from localStorage:",
          error
        );
      }
    }
  }, [authState]);

  const queryClient = useQueryClient();

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
  }

  async function logout() {
    setAuthState({
      user: null,
      isAuthenticated: false,
      accessToken: null,
    });
    await queryClient.removeQueries({ queryKey: ["cart"] });
    await queryClient.removeQueries({ queryKey: ["paymentIntent"] });
    navigate("/");
  }

  async function sessionExpiredLogout() {
    setAuthState({
      user: null,
      isAuthenticated: false,
      accessToken: null,
    });
    await queryClient.removeQueries({ queryKey: ["cart"] });
    navigate("/login");
  }

  function updateAccessToken(accessToken) {
    const currentTime = Date.now();

    const timeSinceLastUpdate = currentTime - lastTokenUpdateRef.current;
    if (timeSinceLastUpdate < 5000) {
      return;
    }

    if (accessToken !== authState.accessToken) {
      lastTokenUpdateRef.current = currentTime;

      setAuthState((prevAuthState) => ({ ...prevAuthState, accessToken }));
    }
    return;
  }

  function sessionExpired() {
    setIsSessionExpiredDialogOpen(true);
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateAccessToken,
        sessionExpired,
        sessionExpiredLogout,
      }}
    >
      <SessionExpiredDialog
        isSessionExpiredDialogOpen={isSessionExpiredDialogOpen}
        setIsSessionExpiredDialogOpen={setIsSessionExpiredDialogOpen}
        sessionExpiredLogout={sessionExpiredLogout}
      />
      {children}
    </AuthContext.Provider>
  );
}
