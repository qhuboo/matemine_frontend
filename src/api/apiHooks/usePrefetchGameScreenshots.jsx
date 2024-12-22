import { useQueryClient } from "@tanstack/react-query";
import api from "../api";

export default function usePrefetchGameScreenshots() {
  const queryClient = useQueryClient();
  return (gameId) => {
    return queryClient.prefetchQuery({
      queryKey: ["screenshots", `${gameId}`],
      queryFn: api.get(
        `${import.meta.env.VITE_BACKEND_URL}/games/screenshots/${gameId}`
      ),
    });
  };
}
