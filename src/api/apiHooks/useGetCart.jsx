import { useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { api } from "../api";
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
    if (cart.status === "success" && cart.data.accessToken) {
      if (user.accessToken !== cart.data.accessToken) {
        user.login({
          ...user.user,
          isAuthencated: true,
          accessToken: cart.data.accessToken,
        });
      }
    }
  }, [cart.status, cart.data, user]);

  const cartItems = useQueries({
    queries: (cart?.data?.data || []).map((game) => ({
      queryKey: ["game", `${game.game_id}`],
      queryFn: api.get(
        `${import.meta.env.VITE_BACKEND_URL}/games/${game.game_id}`
      ),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
      };
    },
  });

  return cartItems;
}
