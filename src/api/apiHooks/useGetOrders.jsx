import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";

export default function useGetOrders() {
  const user = useAuth();
  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: api.protectedGet(`${import.meta.env.VITE_BACKEND_URL}/orders/`, {
      accessToken: user?.accessToken,
      email: user?.email,
    }),
    enabled: user?.isAuthenticated,
    retry: (failureCount, error) => {
      console.log(error.message);
      if (error.message === "Refresh token is expired") {
        return false;
      }
      return true;
    },
  });

  useEffect(() => {
    // console.log("useEffect - useGetorders");
    if (orders?.status === "success" && orders?.data?.accessToken) {
      if (user?.accessToken !== orders?.data?.accessToken) {
        user?.updateAccessToken(orders?.data?.accessToken);
      }
    } else if (orders?.isError) {
      if (orders?.error?.message === "Refresh token is expired") {
        user?.sessionExpired();
      }
    }
  }, [orders, user]);

  // Prefetch each game in all orders - later

  return orders;
}
