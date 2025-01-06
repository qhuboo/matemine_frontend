import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";
import SessionExpiredDialog from "./SessionExpiredDialog";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => {
    console.log("[Auth Init] Starting auth state initialization", {
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
    try {
      const user = localStorage.getItem("user");
      console.log("[Auth Init] LocalStorage state:", {
        hasUser: !!user,
        rawValue: user,
      });
      if (user) {
        const parsedUser = JSON.parse(user);
        console.log("[Auth Init] Parsed user state:", {
          isAuthenticated: parsedUser.isAuthenticated,
          hasAccessToken: !!parsedUser.accessToken,
        });
        return parsedUser;
      }
    } catch (error) {
      console.error("[Auth Init] Parse error:", error);
    }

    console.log("[Auth Init] Returning default state");
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
    console.log("[Auth Effect] Auth state changed:", {
      timestamp: new Date().toISOString(),
      isAuthenticated: authState.isAuthenticated,
      hasAccessToken: !!authState.accessToken,
      url: window.location.href,
    });

    if (authState.isAuthenticated) {
      try {
        localStorage.setItem("user", JSON.stringify(authState));
        console.log("[Auth Effect] Successfully wrote to localStorage");
      } catch (error) {
        console.error("[Auth Effect] Failed to write to localStorage:", error);
      }
    } else {
      try {
        localStorage.removeItem("user");
        console.log("[Auth Effect] Successfully removed from localStorage");
      } catch (error) {
        console.error(
          "[Auth Effect] Failed to remove from localStorage:",
          error
        );
      }
    }
  }, [authState]);

  // Add a visibility change listener to detect page focus/blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log("[Visibility] Document visibility changed:", {
        state: document.visibilityState,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        hasLocalStorage: !!localStorage.getItem("user"),
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Add storage event listener to detect changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        console.log("[Storage] Storage event:", {
          timestamp: new Date().toISOString(),
          oldValue: e.oldValue,
          newValue: e.newValue,
          url: window.location.href,
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync local storage accross tabs but I still don't know how this works
  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (event.key === "user") {
  //       // If "user" was removed or updated in another tab:
  //       const updatedUser = localStorage.getItem("user");
  //       if (updatedUser) {
  //         setAuthState(JSON.parse(updatedUser));
  //       } else {
  //         // If the user key was removed, log out in this tab too.
  //         setAuthState({
  //           user: null,
  //           isAuthenticated: false,
  //           accessToken: null,
  //         });
  //       }
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

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
    console.log("session expired");
    setAuthState({
      user: null,
      isAuthenticated: false,
      accessToken: null,
    });
    await queryClient.removeQueries({ queryKey: ["cart"] });
    navigate("/login");
  }

  function updateAccessToken(accessToken) {
    console.log("We ran");
    const currentTime = Date.now();

    const timeSinceLastUpdate = currentTime - lastTokenUpdateRef.current;
    if (timeSinceLastUpdate < 5000) {
      console.log("skipping token update");
      return;
    }

    if (accessToken !== authState.accessToken) {
      console.log("updating access token");
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
