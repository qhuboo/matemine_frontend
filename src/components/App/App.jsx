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
import { AnimatePresence, motion } from "framer-motion";
import useScrollLock from "../../hooks/useScrollLock";
import AuthProvider from "../Auth/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
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

  // Get the current location for AnimatePresence
  const location = useLocation();

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
    function handleScroll() {
      setScrollPosition(document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.documentElement.scrollTo({ top: scrollPositionClose });
    }
  }, [isMobileMenuOpen]);

  return (
    <QueryClientProvider client={queryClient}>
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
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MainPage />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/marketplace"
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MarketPlace />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Cart />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Checkout />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/product/:gameId"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Product />
                      </motion.div>
                    }
                  />
                </Routes>
              </AnimatePresence>
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
  // border: 2px solid red;
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

  @media (${QUERIES.tabletAndSmaller}) {
    display: none;
  }
`;

export default App;
