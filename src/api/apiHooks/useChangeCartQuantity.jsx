import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export default function useChangeCartQuantity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.protectedPost(
      `${import.meta.env.VITE_BACKEND_URL}/cart/quantity`
    ),
    onMutate: (payload) => {
      console.log(payload.body.gameId);
      console.log(payload.body.quantity);
      const { gameId } = payload.body;
      const { quantity } = payload.body;
      const queryData = queryClient.getQueryData(["game", `${gameId}`]);
      console.log(queryData);
    },
    onError: () => {},
  });
}
