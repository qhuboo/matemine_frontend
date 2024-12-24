import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";

export default function useGetCart() {
  const user = useAuth();

  const cart = useQuery({
    queryKey: ["cart"],
    queryFn: api.protectedGet(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
      accessToken: user?.accessToken,
      email: user?.user?.email,
    }),
    enabled: user?.isAuthenticated,
  });

  useEffect(() => {
    if (cart?.status === "success" && cart?.data?.accessToken) {
      if (user?.accessToken !== cart?.data?.accessToken) {
        user?.updateAccessToken(cart?.data?.accessToken);
      }
    }
  }, [cart?.status, cart?.data, user]);

  return cart;
}
