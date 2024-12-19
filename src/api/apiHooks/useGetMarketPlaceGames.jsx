import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export default function useGetMarketPlaceGames(location) {
  const queryString = new URLSearchParams(location.search).toString();

  return useQuery({
    queryKey: ["games", queryString],
    queryFn: api.get(
      `${import.meta.env.VITE_BACKEND_URL}/games${location.search}`
    ),
  });
}
