import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import SessionExpiredDialog from "../SessionExpiredDialog/SessionExpiredDialog";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user
        ? JSON.parse(user)
        : {
            user: null,
            isAuthenticated: false,
            accessToken: null,
          };
    } catch (error) {
      console.log("Failed to parse auth state from local storage");
      console.log(error);
      return {
        user: null,
        isAuthenticated: false,
        accessToken: null,
      };
    }
  });

  const [isSessionExpiredDialogOpen, setIsSessionExpiredDialogOpen] =
    useState(false);

  // Update local storage when auth state changess
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(authState));
    } else {
      localStorage.removeItem("user");
    }
  }, [authState]);

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
    setAuthState((prevAuthState) => ({ ...prevAuthState, accessToken }));
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
