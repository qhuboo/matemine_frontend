import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";

export default function useGetCart() {
  const user = useAuth();
  const queryClient = useQueryClient();

  const cart = useQuery({
    queryKey: ["cart"],
    queryFn: api.protectedGet(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
      accessToken: user?.accessToken,
      email: user?.user?.email,
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
    if (cart?.status === "success" && cart?.data?.accessToken) {
      if (user?.accessToken !== cart?.data?.accessToken) {
        user?.updateAccessToken(cart?.data?.accessToken);
      }
    } else if (cart?.isError) {
      if (cart?.error?.message === "Refresh token is expired") {
        user?.sessionExpired();
      }
    }
  }, [cart, user]);

  useEffect(() => {
    if (cart?.data?.data) {
      cart?.data?.data.forEach((game) => {
        const GameWOQuantity = { ...game };
        delete GameWOQuantity.quantity;
        queryClient.setQueryData(["game", `${game.game_id}`], GameWOQuantity);
      });

      cart?.data?.data.forEach(async (game) => {
        await queryClient.prefetchQuery({
          queryKey: ["screenshots", `${game.game_id}`],
          queryFn: api.get(
            `${import.meta.env.VITE_BACKEND_URL}/games/screenshots/${
              game.game_id
            }`
          ),
        });
      });
    }
  }, [cart?.data?.data, queryClient]);

  return cart;
}
