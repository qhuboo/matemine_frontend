import styled, { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <Main>This is the Main component</Main>
      <GlobalStyles />
    </>
  );
}

const Main = styled.div`
  border: 2px solid red;
  height: 100%;
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
`;

export default App;
