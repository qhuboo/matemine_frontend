import { useQueryClient } from "@tanstack/react-query";
import api from "../api";

export default function usePrefetchMarketPlaceWithConsole() {
  const queryClient = useQueryClient();

  return (platform, console) => {
    const queryString = new URLSearchParams(
      `?perPage=12&page=1&sort=rating-desc&${platform}=${console}`
    ).toString();
    return queryClient.prefetchQuery({
      queryKey: ["games", queryString],
      queryFn: api.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/games?perPage=12&page=1&sort=rating-desc&${platform}=${console}`
      ),
    });
  };
}
