import styled, { keyframes } from "styled-components";
import { QUERIES } from "../../constants";

function Drawer({ children, handleDismiss }) {
  return (
    <Wrapper>
      <Backdrop onClick={handleDismiss} />
      <Menu>
        {children}
        <DismissButton onClick={handleDismiss}>Dismiss</DismissButton>
      </Menu>
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
  //   border: 2px dotted red;
  position: fixed;
  inset: 0;
  padding: 16px;
  color: black;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: hsla(176, 100%, 0%, 0.6);
  animation: ${fadeIn} 400ms;
`;

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: clamp(400px, 50%, 550px);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${slideIn} 800ms;

  @media (${QUERIES.mobileAndSmaller}) {
    width: 100%;
  }
`;

const DismissButton = styled.button`
  background-color: darkcyan;
  color: black;
`;

export default Drawer;
