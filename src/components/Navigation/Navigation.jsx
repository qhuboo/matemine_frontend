import styled from "styled-components";
import Drawer from "../Drawer";
import { Link } from "react-router-dom";
import { Search, Menu } from "react-feather";

import useToggle from "../../hooks/use-toggle";

function Navigation() {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <NavigationBar>
      <Title to={"/"}>MateMine</Title>
      <MobileMenuButton onClick={() => setIsOpen(true)}>
        <Menu />
      </MobileMenuButton>
      {isOpen && (
        <Drawer handleDismiss={setIsOpen}>
          <ul>
            <li>
              <Link to={"/marketplace"}>Marketplace</Link>
            </li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </Drawer>
      )}
    </NavigationBar>
  );
}

const NavigationBar = styled.nav`
  border-bottom: 1px solid black;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const MobileMenuButton = styled.button`
  display: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  flex-shrink: 0;
  color: black;

  @media (max-width: 1100px) {
    display: revert;
  }
`;

const Title = styled(Link)`
  font-family: "Ron";
  font-size: 3rem;
  color: black;
  text-decoration: none;
`;

export default Navigation;
