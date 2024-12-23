import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";

export default function useRemoveFromCart() {
  const user = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.protectedPost(
      `${import.meta.env.VITE_BACKEND_URL}/cart/remove`
    ),
    onMutate: async (payload) => {
      console.log("On mutate");

      // Cancel any queries that are fetching
      await queryClient.cancelQueries({
        queryKey: ["cart"],
      });

      const cartCache = queryClient.getQueryData(["cart"]);

      if (cartCache) {
        if (payload?.body?.gameId) {
          console.log("Cart exists");

          const cart = cartCache?.data;

          const { gameId } = payload.body;
          console.log(gameId);

          if (cart.length > 0) {
            const gameToRemove = cart.find(
              (cartGame) => cartGame.game_id === Number(gameId)
            );
            if (gameToRemove) {
              const newCart = cart.filter(
                (cartGame) => cartGame.game_id !== Number(gameId)
              );
              const sortedNewCart = newCart.sort((a, b) =>
                a.title.localeCompare(b.title)
              );
              console.log(sortedNewCart);
              queryClient.setQueryData(["cart"], {
                ...cartCache,
                data: sortedNewCart,
              });

              // Return a function that executes a setQuery with the old cart to reset in case of error
              return () => {
                queryClient.setQueryData(["cart"], cartCache);
              };
            }
          }
        }
      } else {
        console.log("The cart does not exist, no optimistic mutation");
        return;
      }
    },
    onSuccess: (data) => {
      console.log("On success");

      // If the mutation needed to hit the refresh route update the
      // auth state accessToken
      if (data.accessToken) {
        console.log("There was a token refresh");
        user.login({
          ...user.user,
          isAuthenticated: true,
          accessToken: data.accessToken,
        });
      }
    },
    onError: (error, variables, rollback) => {
      console.log("On error");
      console.log(error);
      rollback?.();
    },
    onSettled: () => {
      console.log("On settled");
      // Refetch the cart after a succesful cart mutation
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}
