import styled, { keyframes } from "styled-components";
import { QUERIES } from "../../constants";
import { X } from "react-feather";
import { createPortal } from "react-dom";

export default function FilterDrawer({ children, handleDismiss, margin }) {
  return createPortal(
    <Wrapper $margin={margin}>
      <Backdrop onClick={handleDismiss} />
      <Menu>
        <X size={32} onClick={handleDismiss} />
        {children}
      </Menu>
    </Wrapper>,
    document.querySelector("#drawer")
  );
}

const slideIn = keyframes`
from {
    transform: translateX(-100%);
    }

`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  //   border: 2px dotted red;
  position: fixed;
  inset: 0;
  padding: 16px;
  color: black;
  margin-top: ${(props) => props.$margin};

  @media (min-width: 1101px) {
    display: none;
  }
`;

const Backdrop = styled.div`
  // border: 3px solid red;
  position: absolute;
  inset: 0;
  background: hsla(176, 100%, 0%, 0.6);
  animation: ${fadeIn} 400ms;
`;

const Menu = styled.div`
  //   border: 2px solid blue;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 10px;
  width: clamp(400px, 50%, 550px);
  background-color: var(--background-color);
  overflow-y: auto;

  animation: ${slideIn} 800ms;

  @media (${QUERIES.mobileAndSmaller}) {
    width: 100%;
  }
`;
