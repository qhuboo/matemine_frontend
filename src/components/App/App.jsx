import styled, { createGlobalStyle } from "styled-components";
import MainPage from "../MainPage";
import MarketPlace from "../MarketPlace";
import Cart from "../Cart";
import Checkout from "../Checkout";
import Product from "../Product/Product";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { QUERIES } from "../../constants";

function App() {
  return (
    <>
      <Main>
        <Navigation />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </ContentWrapper>
      </Main>

      <GlobalStyles />
    </>
  );
}

const Main = styled.div`
  // border: 2px solid red;
  min-height: 100dvh;
  --navigation-bar-height: 100px;

  @media (${QUERIES.tabletAndSmaller}) {
    --navigation-bar-height: 50px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: var(--navigation-bar-height);
  font-family: "Rajdhani";
  --content-padding: 25px;
  padding: var(--content-padding);
  overflow: hidden;

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

export default App;
