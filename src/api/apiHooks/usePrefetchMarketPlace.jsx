import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export default function usePrefetchMarketPlace() {
  const queryClient = useQueryClient();

  const queryString = new URLSearchParams(
    "?perPage=12&page=1&sort=alpha-asc"
  ).toString();

  return () =>
    queryClient.prefetchQuery({
      queryKey: ["games", queryString],
      queryFn: api.get(
        `${import.meta.env}/games?perPage=12&page=1&sort=alpha-asc`
      ),
    });
}
