import { User } from "react-feather";
import styled from "styled-components";

export default function NotLoggedInUserIcon() {
  return (
    <div style={{ position: "relative" }}>
      <User />
      <NotLoggedInLight />
    </div>
  );
}

const NotLoggedInLight = styled.div`
  position: absolute;
  top: -5px;
  right: -7px;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 1000px;
  box-shadow: inset 0px -1px 1px hsl(0deg 100% 20% / 0.5),
    inset 0px -1px 3px hsl(0deg 100% 20% / 0.5), 0px 0px 2px black,
    0px 0px 4px black, 0px 0px 8px black, 0px 0px 6px red, 0px 0px 12px red;
  transition: opacity 0.3s cubic-bezier(0, 0.69, 0.41, 0.99),
    transform 300ms cubic-bezier(0, 0.69, 0.41, 0.99);
  opacity: 0.8;
`;
