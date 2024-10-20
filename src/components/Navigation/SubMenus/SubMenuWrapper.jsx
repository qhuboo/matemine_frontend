import styled from "styled-components";

export default function SubMenuWrapper({ children, $isActive }) {
  return <Wrapper $isActive={$isActive}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  border-bottom: 2px solid black;
  // border: 3px solid red;
  width: 100%;
  position: absolute;
  top: var(--navigation-bar-height);
  background: var(--background-color);
  clip-path: ${(props) =>
    props.$isActive ? "inset(0%)" : "inset(0% 0% 100% 0%)"};
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: clip-path 800ms cubic-bezier(1, -0.01, 0, 1), opacity 100ms ease;
`;
