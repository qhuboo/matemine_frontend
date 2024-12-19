import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";

export default function useAddGameToCart() {
  const user = useAuth();
  return useMutation({
    mutationFn: api.protectedPost(
      `${import.meta.env.VITE_BACKEND_URL}/cart/add`
    ),
    onSuccess: (data) => {
      console.log("OnSuccess");
      // console.log(data.data.message);
      if (data.accessToken) {
        // console.log("replacing the access token");
        user.login({
          ...user.user,
          isAuthencated: true,
          accessToken: data.accessToken,
        });
      }
    },
    onError: (error) => {
      console.log("There was an error");
      console.log(error);
    },
  });
}
