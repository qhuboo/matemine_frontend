import { User } from "react-feather";
import styled from "styled-components";

export default function LoggedInUserIcon() {
  return (
    <div style={{ position: "relative" }}>
      <User />
      <LoggedInLight />
    </div>
  );
}

const LoggedInLight = styled.div`
  position: absolute;
  top: -5px;
  right: -7px;
  width: 10px;
  height: 10px;
  background: springgreen;
  border-radius: 1000px;
  box-shadow: inset 0px -1px 1px hsl(150deg 100% 20% / 0.5),
    inset 0px -1px 3px hsl(150deg 100% 20% / 0.5), 0px 0px 2px black,
    0px 0px 4px black, 0px 0px 8px black, 0px 0px 6px springgreen,
    0px 0px 12px springgreen;
  transition: opacity 0.3s cubic-bezier(0, 0.69, 0.41, 0.99),
    transform 300ms cubic-bezier(0, 0.69, 0.41, 0.99);
  opacity: 0.8;
`;
