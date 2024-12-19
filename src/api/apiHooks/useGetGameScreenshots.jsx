import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export default function useGetGameScreenshots(gameId) {
  return useQuery({
    queryKey: ["games", "game", "screenshots", `${gameId}`],
    queryFn: api.get(
      `${import.meta.env.VITE_BACKEND_URL}/games/screenshots/${gameId}`
    ),
    staleTime: Infinity,
  });
}
