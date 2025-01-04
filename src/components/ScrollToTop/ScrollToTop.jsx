import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // console.log("useEffect - ScrollToTop");

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
}
