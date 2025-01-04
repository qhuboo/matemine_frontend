import { Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useGetPaymentIntent from "../../api/apiHooks/useGetPaymentIntent";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

export default function PaymentRoutes() {
  const paymentIntent = useGetPaymentIntent();

  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: "Verdana",
      fontLineHeight: "1.5",
      borderRadius: "0",
      colorBackground: "#fff",
      focusBoxShadow: "none",
      focusOutline: "-webkit-focus-ring-color auto 1px",
      tabIconSelectedColor: "var(--colorText)",
    },
    rules: {
      ".Input, .CheckboxInput, .CodeInput": {
        transition: "none",
        boxShadow:
          "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input--invalid": {
        color: "#DF1B41",
      },
      ".Tab, .Block, .PickerItem--selected": {
        backgroundColor: "#dfdfdf",
        boxShadow:
          "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
      },
      ".Tab": {
        transition: "none",
      },
      ".Tab:hover": {
        backgroundColor: "#eee",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        color: "var(--colorText)",
        backgroundColor: "#ccc",
      },
      ".Tab:focus, .Tab--selected:focus": {
        boxShadow:
          "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        outline: "none",
      },
      ".Tab:focus-visible": {
        outline: "var(--focusOutline)",
      },
      ".PickerItem": {
        backgroundColor: "#dfdfdf",
        boxShadow:
          "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        transition: "none",
      },
      ".PickerItem:hover": {
        backgroundColor: "#eee",
      },
      ".PickerItem--highlight": {
        outline: "1px solid blue",
      },
      ".PickerItem--selected:hover": {
        backgroundColor: "#dfdfdf",
      },
    },
  };

  const loader = "auto";

  // Still fetching
  if (paymentIntent.isLoading) {
    return;
  }

  // No payment intent yet or error
  if (!paymentIntent?.data?.data?.clientSecret) {
    return <Outlet />;
  }

  // Have payment intent, show Elements
  return (
    <Elements
      options={{
        clientSecret: paymentIntent.data.data.clientSecret,
        appearance,
        loader,
      }}
      stripe={stripePromise}
    >
      <Outlet />
    </Elements>
  );
}
