import styled from "styled-components";
import Drawer from "../Drawer";
import { Link } from "react-router-dom";

function MobileMenu({ handleDismiss }) {
  return (
    <Drawer handleDismiss={handleDismiss} margin={"50px"}>
      <Wrapper>
        <LinkList>
          <NavLink to={"/"} onClick={handleDismiss}>
            Home
          </NavLink>
          <NavLink
            to={"/marketplace?platforms=nintendo,sega,playstation,xbox"}
            onClick={handleDismiss}
          >
            All Games
          </NavLink>
          <NavLink>Nintendo</NavLink>
          <NavLink>Sega</NavLink>
          <NavLink>Playstation</NavLink>
          <NavLink>Xbox</NavLink>
        </LinkList>
        <UserLinkList>
          <UserLink>Account</UserLink>
          <UserLink>Wishlist</UserLink>
          <UserLink>Contact</UserLink>
        </UserLinkList>
      </Wrapper>
    </Drawer>
  );
}

const Wrapper = styled.nav`
  // border: 2px solid springgreen;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0px;
  padding: 15px;
`;

const NavLink = styled(Link)`
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 4rem;
  color: black;
  text-decoration: none;
  line-height: 1;
`;

const UserLinkList = styled.ul`
  //   border: 2px solid springgreen;
  padding: 15px;
  display: flex;
  gap: 20px;
  width: 100%;
`;

const UserLink = styled(Link)`
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 1.25rem;
  color: black;
  text-decoration: none;
`;

export default MobileMenu;
