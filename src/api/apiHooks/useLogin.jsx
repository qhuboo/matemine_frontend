import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function useLogin(destination) {
  const queryClient = useQueryClient();
  const user = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: api.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`),
    onSuccess: async (data) => {
      if (data.isAuthenticated) {
        user.login(data);
        await queryClient.prefetchQuery({
          queryKey: ["cart"],
          queryFn: api.protectedGet(
            `${import.meta.env.VITE_BACKEND_URL}/cart/`,
            {
              accessToken: data?.accessToken,
              email: data?.email,
            }
          ),
        });
        navigate(destination);
      }
    },
  });
}
