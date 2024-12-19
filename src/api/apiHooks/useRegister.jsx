import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function useRegister(destination) {
  const user = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: api.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`),
    onSuccess: (data) => {
      if (data.isAuthenticated) {
        user.login(data);
        navigate(destination);
      }
    },
  });
}
