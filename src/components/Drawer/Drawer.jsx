import styled, { keyframes } from "styled-components";
import { QUERIES } from "../../constants";

function Drawer({ children, handleDismiss, margin }) {
  return (
    <Wrapper margin={margin}>
      <Backdrop onClick={handleDismiss} />
      <Menu>{children}</Menu>
    </Wrapper>
  );
}

const slideIn = keyframes`
from {
    transform: translateX(100%);
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  // border: 2px dotted red;
  position: fixed;
  inset: 0;
  padding: 16px;
  color: black;
  margin-top: ${(props) => props.margin};

  @media (min-width: 1101px) {
    display: none;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: hsla(176, 100%, 0%, 0.6);
  animation: ${fadeIn} 400ms;
`;

const Menu = styled.div`
  // border: 2px solid red;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: clamp(400px, 50%, 550px);
  background-color: var(--background-color);

  animation: ${slideIn} 800ms;

  @media (${QUERIES.mobileAndSmaller}) {
    width: 100%;
  }
`;

export default Drawer;
