import { useMutation } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import usePrefetchCart from "./usePrefetchCart";

export default function useLogin(destination) {
  const user = useAuth();
  const navigate = useNavigate();
  const prefetchCart = usePrefetchCart();

  return useMutation({
    mutationFn: api.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`),
    onSuccess: async (data) => {
      if (data.isAuthenticated) {
        console.log(data);
        user.login(data);
        await prefetchCart(data.accessToken, data.email);
        navigate(destination);
      }
    },
  });
}
