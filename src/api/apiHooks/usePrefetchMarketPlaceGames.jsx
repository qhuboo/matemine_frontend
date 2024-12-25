import { useQueryClient } from "@tanstack/react-query";
import api from "../api";

export default function usePrefetchMarketPlaceGames() {
  const queryClient = useQueryClient();

  const queryString = new URLSearchParams(
    "?perPage=12&page=1&sort=alpha-asc"
  ).toString();

  return async () =>
    await queryClient.prefetchQuery({
      queryKey: ["games", queryString],
      queryFn: api.get(
        `${import.meta.env.VITE_BACKEND_URL}/games?${queryString}`
      ),
    });
}
