import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";

export default function useChangeCartQuantity() {
  const user = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.protectedPost(
      `${import.meta.env.VITE_BACKEND_URL}/cart/quantity`
    ),
    onMutate: async (payload) => {
      console.log("On mutate");

      // Cancel any queries that are fetching
      await queryClient.cancelQueries({
        queryKey: ["cart"],
      });

      const gameId = Number(payload?.body?.gameId);
      const quantity = Number(payload?.body?.quantity);

      const cartCache = queryClient.getQueryData(["cart"]);
      if (cartCache?.data) {
        const cart = cartCache?.data;
        const gameToChange = cart.find(
          (cartGame) => cartGame.game_id === gameId
        );
        if (gameToChange) {
          const cartWOGame = cart.filter(
            (cartGame) => cartGame.game_id !== gameId
          );
          const newGame = { ...gameToChange, quantity };
          const newCart = [...cartWOGame, newGame];
          const sortedNewCart = newCart.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          console.log(sortedNewCart);
          queryClient.setQueryData(["cart"], {
            ...cartCache,
            data: sortedNewCart,
          });
        }

        // Return a function that executes a setQuery with the old cart to reset in case of error
        return () => {
          queryClient.setQueryData(["cart"], cartCache);
        };
      } else {
        console.log("The cart does not exist, no optimistic mutation");
        return;
      }
    },
    retry: (failureCount, error) => {
      if (error.message === "Refresh token is expired") {
        return false;
      }
      return true;
    },
    onSuccess: (data) => {
      console.log("On success");

      // If the mutation needed to hit the refresh route update the
      // auth state accessToken
      if (data?.accessToken) {
        console.log("There was a token refresh");
        user.updateAccessToken(data.accessToken);
      }

      // Invalidate the cart after a succesful cart mutation
      queryClient.invalidateQueries({
        queryKey: ["cart"],
        refetchType: "active",
      });
    },
    onError: (error, variables, rollback) => {
      console.log("On error");
      rollback?.();
      if (error.message === "Refresh token is expired") {
        user?.sessionExpired();
      }
    },
  });
}
