import styled, { keyframes } from "styled-components";

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
0% {
    transform: translateX(100%);
}
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  border: 2px dotted red;
  position: fixed;
  inset: 0;
  padding: 16px;
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
  width: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${slideIn} 400ms;
`;

const DismissButton = styled.button`
  background-color: darkcyan;
`;

export default Drawer;
