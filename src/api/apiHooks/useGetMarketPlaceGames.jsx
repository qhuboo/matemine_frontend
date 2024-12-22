import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useEffect } from "react";

export default function useGetMarketPlaceGames(location) {
  const queryClient = useQueryClient();
  const queryString = new URLSearchParams(location.search).toString();

  const games = useQuery({
    queryKey: ["games", queryString],
    queryFn: api.get(
      `${import.meta.env.VITE_BACKEND_URL}/games${location.search}`
    ),
    enabled: queryString.length > 0,
  });

  useEffect(() => {
    if (games.data) {
      console.log("Games have changed");
      games.data?.games.forEach((game) => {
        queryClient.setQueryData(["game", `${game.game_id}`], game);
      });
    }
  }, [games.data, queryClient]);

  return games;
}
