import styled, { createGlobalStyle } from "styled-components";
import MainPage from "../MainPage";
import MarketPlace from "../MarketPlace";
import Cart from "../Cart";
import Checkout from "../Checkout";
import Product from "../Product/Product";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { QUERIES } from "../../constants";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { useState } from "react";
import { keyframes } from "styled-components";
import useToggle from "../../hooks/use-toggle";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useToggle(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <Wrapper $isMobileMenuOpen={isMobileMenuOpen}>
      <ScrollToTop />
      <Main>
        <Navigation
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsSubMenuOpen={setIsSubMenuOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <ContentWrapper>
          {isSubMenuOpen && (
            <Backdrop
              onClick={() => {
                setActiveMenu("");
                setIsSubMenuOpen(false);
              }}
            />
          )}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:gameId" element={<Product />} />
          </Routes>
        </ContentWrapper>
      </Main>
      <GlobalStyles />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // border: 3px solid purple;
  position: ${(props) => (props.$isMobileMenuOpen ? "fixed" : "static")};
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
  margin-top: var(--navigation-bar-height);
  font-family: "Rajdhani";
  --content-padding: 25px;
  padding: var(--content-padding);
  overflow: hidden;
  position: relative;
  z-index: -1;
  min-height: 100%;

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
