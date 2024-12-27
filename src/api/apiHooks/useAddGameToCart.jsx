import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function useAddGameToCart() {
  const navigate = useNavigate();
  const user = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.protectedPost(
      `${import.meta.env.VITE_BACKEND_URL}/cart/add`
    ),
    onMutate: async (payload) => {
      console.log("On mutate");

      // Cancel any queries that are fetching
      await queryClient.cancelQueries({
        queryKey: ["cart"],
      });

      const cartCache = queryClient.getQueryData(["cart"]);
      // Check to see if the cart cache exists
      if (cartCache) {
        console.log("Cart exists");

        const cart = cartCache?.data;

        // Get the gameId and quantity
        const { gameId } = payload.body;
        const { quantity } = payload.body;

        // Check if the game is already in the cart and if so, update the quantity
        const game = cart.find((game) => game.game_id === Number(gameId));

        if (game) {
          console.log("Game already in the cart");

          const newQuantity = Number(game.quantity) + Number(quantity);
          const newGame = { ...game, quantity: newQuantity };

          // Make a copy of the cart with the game removed
          const cartWOGame = cart.filter(
            (game) => game.game_id !== Number(gameId)
          );

          // Create a new cart with the new game added
          const newCart = [...cartWOGame, newGame];
          const sortedNewCart = newCart.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          console.log(sortedNewCart);
          queryClient.setQueryData(["cart"], {
            ...cartCache,
            data: sortedNewCart,
          });
        } else {
          console.log("Game is not in the cart");

          // Get the game and add the quantity before adding to the cart optimistically
          const game = queryClient.getQueryData(["game", `${gameId}`]);
          const gameWQuantity = { ...game, quantity };
          const newCart = [...cart, gameWQuantity];
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
      }
    },
    retry: (failureCount, error) => {
      console.log("On retry");

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
        user?.updateAccessToken(data.accessToken);
      }

      // Refetch the cart after a succesful cart mutation
      queryClient.refetchQueries({ queryKey: ["cart"] });

      navigate("/cart");
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
