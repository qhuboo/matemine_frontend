import styled, { createGlobalStyle } from "styled-components";
import Navigation from "../Navigation";
import MainPage from "../MainPage";
import MarketPlace from "../MarketPlace";

function App() {
  return (
    <>
      <Main>
        <Navigation />
        {/* <MainPage /> */}
        {/* <MarketPlace /> */}
      </Main>

      <GlobalStyles />
    </>
  );
}

const Main = styled.div`
  border: 2px solid red;
  min-height: 100dvh;
  max-width: 1440px;
  margin: 0 auto;
  // background-image: linear-gradient(
  //   45deg,
  //   hsl(240deg 100% 20%) 0%,
  //   hsl(289deg 100% 21%) 11%,
  //   hsl(315deg 100% 27%) 22%,
  //   hsl(329deg 100% 36%) 33%,
  //   hsl(337deg 100% 43%) 44%,
  //   hsl(357deg 91% 59%) 56%,
  //   hsl(17deg 100% 59%) 67%,
  //   hsl(34deg 100% 53%) 78%,
  //   hsl(45deg 100% 50%) 89%,
  //   hsl(55deg 100% 50%) 100%
  // );
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
  font-family: "Jersey_10";
  src: url(/fonts/Jersey10-Regular.ttf)
}

`;

export default App;
