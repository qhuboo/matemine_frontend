import { useQuery } from "@tanstack/react-query";
import api from "../api";

export default function useGetGame(gameId) {
  return useQuery({
    queryKey: ["game", `${gameId}`],
    queryFn: api.get(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`),
  });
}
