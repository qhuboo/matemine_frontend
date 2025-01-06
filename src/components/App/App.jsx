import styled, { createGlobalStyle } from "styled-components";
import MainPage from "../MainPage";
import MarketPlace from "../MarketPlace";
import Cart from "../Cart";
import Checkout from "../Checkout";
import Product from "../Product/Product";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { QUERIES } from "../../constants";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "styled-components";
import useScrollLock from "../../hooks/useScrollLock";
import AuthProvider from "../Auth/AuthProvider";
import ProtectedRoutes from "../Auth/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Account from "../Account/Account";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Complete from "../Checkout/Complete";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PaymentRoutes from "../Stripe/PaymentRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPositionClose, setScrollPositionClose] = useState(0);
  const wrapperRef = useRef();
  const contentWrapperRef = useRef();
  const { lockScroll, unlockScroll } = useScrollLock(
    wrapperRef,
    contentWrapperRef,
    scrollPosition
  );

  const location = useLocation();
  useEffect(() => {
    console.log("Navigated to: ", location.pathname);
  }, [location]);

  // Open and close event handler function
  function handleOpenMobileMenu() {
    setScrollPositionClose(scrollPosition);
    lockScroll();
    setIsMobileMenuOpen(true);
  }

  function handleCloseMobileMenu() {
    unlockScroll();
    setIsMobileMenuOpen(false);
  }

  // Register the scroll event listener
  useEffect(() => {
    // console.log("useEffect - Register scroll event listeners");

    function handleScroll() {
      setScrollPosition(document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log("useEffect - isMobileMenuOpen scroll thing");

    if (!isMobileMenuOpen) {
      document.documentElement.scrollTo({ top: scrollPositionClose });
    }
  }, [isMobileMenuOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <AuthProvider>
        <Wrapper ref={wrapperRef}>
          <ScrollToTop />
          <Main>
            <Navigation
              isMobileMenuOpen={isMobileMenuOpen}
              handleOpenMobileMenu={handleOpenMobileMenu}
              handleCloseMobileMenu={handleCloseMobileMenu}
              setIsSubMenuOpen={setIsSubMenuOpen}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
            <ContentWrapper ref={contentWrapperRef}>
              {isSubMenuOpen && (
                <Backdrop
                  onClick={() => {
                    setActiveMenu("");
                    setIsSubMenuOpen(false);
                  }}
                />
              )}
              <GapDiv />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <MainPage />
                    </div>
                  }
                />
                <Route element={<ProtectedRoutes />}>
                  <Route element={<PaymentRoutes />}>
                    <Route path="/checkout" element={<Checkout />} />
                  </Route>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/account" element={<Account />} />
                </Route>
                <Route path="/complete" element={<Complete />} />
                <Route
                  path="/marketplace"
                  element={
                    <div>
                      <MarketPlace />
                    </div>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:gameId" element={<Product />} />
              </Routes>
            </ContentWrapper>
          </Main>
          <GlobalStyles />
        </Wrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const Wrapper = styled.div`
  // border: 3px solid purple;
`;

const Main = styled.div`
  // border: 2px solid yellow;
  height: 100dvh;
  --navigation-bar-height: 100px;
  isolation: isolate;

  @media (${QUERIES.tabletAndSmaller}) {
    --navigation-bar-height: 50px;
  }
`;

const ContentWrapper = styled.div`
  // border: 3px dotted red;
  // margin-top: var(--navigation-bar-height);
  font-family: "Rajdhani";
  --content-padding: 25px;
  padding: var(--content-padding);
  /* commented this out to make the scrollTop work but don't know what this changes otherwise or why I had it originally */
  // overflow: hidden;
  isolation: isolate;
  z-index: -1;
  position: relative;
  height: 100%;

  @media (${QUERIES.laptopAndSmaller}) {
    --content-padding: 50px;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    --content-padding: 25px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    --content-padding: 15px;
  }
`;

const GapDiv = styled.div`
  width: 100%;
  height: var(--navigation-bar-height);
`;

const GlobalStyles = createGlobalStyle`

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.25rem;
  --background-color: mintcream;
  background-color: var(--background-color);
  scrollbar-gutter: stable both-edges;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root{
  isolation: isolate;
}


@font-face {
  font-family: "Ron";
  src: url("/fonts/RON.woff") format("woff");
}

@font-face {
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/Rajdhani-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 600;
  src: url("/fonts/Rajdhani-SemiBold.ttf") format("truetype");
}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Backdrop = styled.div`
  background-color: hsla(176, 100%, 0%, 0.6);
  position: absolute;
  inset: 0;
  z-index: 1;
  animation: ${fadeIn} 400ms ease;
  overflow-y: hidden;
  height: 230%;

  @media (${QUERIES.tabletAndSmaller}) {
    display: none;
  }
`;
