import { useQuery } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../../components/Auth/hooks/useAuth";
import { useEffect } from "react";

export default function useGetPaymentIntent() {
  const user = useAuth();

  const paymentIntent = useQuery({
    queryKey: ["paymentIntent"],
    queryFn: api.protectedGet(
      `${import.meta.env.VITE_BACKEND_URL}/stripe/get-payment-intent`,
      {
        accessToken: user?.accessToken,
        email: user?.user?.email,
      }
    ),
    enabled: user?.isAuthenticated,
    retry: (failureCount, error) => {
      console.log(error.message);
      if (error.message === "Refresh token is expired") {
        return false;
      }
      return true;
    },
    gcTime: Infinity,
  });

  useEffect(() => {
    // console.log("useEffect - useGetPaymentIntent");

    if (
      paymentIntent?.status === "success" &&
      paymentIntent?.data?.accessToken
    ) {
      if (user?.accessToken !== paymentIntent?.data?.accessToken) {
        user?.updateAccessToken(paymentIntent?.data?.accessToken);
      }
    } else if (paymentIntent?.isError) {
      if (paymentIntent?.error?.message === "Refresh token is expired") {
        user?.sessionExpired();
      }
    }
  }, [paymentIntent, user]);

  return paymentIntent;
}
