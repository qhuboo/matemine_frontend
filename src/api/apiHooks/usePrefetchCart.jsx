import { useQueryClient } from "@tanstack/react-query";
import api from "../api";

export default function usePrefetchCart() {
  const queryClient = useQueryClient();
  return async (accessToken, email) => {
    await queryClient.prefetchQuery({
      queryKey: ["cart"],
      queryFn: api.protectedGet(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
        accessToken,
        email,
      }),
    });
  };
}
