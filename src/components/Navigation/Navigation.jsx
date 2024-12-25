import styled from "styled-components";
import { Link } from "react-router-dom";
import { Search, Menu, ShoppingBag, Heart } from "react-feather";
import { User } from "react-feather";

import { QUERIES } from "../../constants";
import MobileMenu from "../MobileMenu/MobileMenu";

import SubMenus from "./SubMenus";

import useAuth from "../Auth/hooks/useAuth";
import usePrefetchMarketPlaceGames from "../../api/apiHooks/usePrefetchMarketPlaceGames";

function Navigation({
  isMobileMenuOpen,
  handleOpenMobileMenu,
  handleCloseMobileMenu,
  setIsSubMenuOpen,
  activeMenu,
  setActiveMenu,
}) {
  const user = useAuth();

  const prefetchMarketPlaceGames = usePrefetchMarketPlaceGames();

  return (
    <Wrapper
      onMouseEnter={() => {
        prefetchMarketPlaceGames();
      }}
    >
      <NavigationBar>
        <Side>
          <Title to={"/"}>MateMine</Title>
        </Side>
        <Links>
          <NavLink
            to={{
              pathname: "/marketplace",
              search: "?perPage=12&page=1&sort=alpha-asc",
            }}
            onClick={() => {
              setActiveMenu("");
              setIsSubMenuOpen(false);
            }}
          >
            MarketPlace
          </NavLink>
          <SubMenuButton
            onClick={() => {
              if (activeMenu === "nintendo") {
                setActiveMenu("");
                setIsSubMenuOpen(false);
              } else {
                setActiveMenu("nintendo");
                setIsSubMenuOpen(true);
              }
            }}
          >
            Nintendo
          </SubMenuButton>
          <SubMenuButton
            onClick={() => {
              if (activeMenu === "sega") {
                setActiveMenu("");
                setIsSubMenuOpen(false);
              } else {
                setActiveMenu("sega");
                setIsSubMenuOpen(true);
              }
            }}
          >
            Sega
          </SubMenuButton>
          <SubMenuButton
            onClick={() => {
              if (activeMenu === "playstation") {
                setActiveMenu("");
                setIsSubMenuOpen(false);
              } else {
                setActiveMenu("playstation");
                setIsSubMenuOpen(true);
              }
            }}
          >
            PlayStation
          </SubMenuButton>
          <SubMenuButton
            onClick={() => {
              if (activeMenu === "xbox") {
                setActiveMenu("");
                setIsSubMenuOpen(false);
              } else {
                setActiveMenu("xbox");
                setIsSubMenuOpen(true);
              }
            }}
          >
            Xbox
          </SubMenuButton>
        </Links>

        <Side>
          <Side />

          <IconLinks>
            <NavLink to={"/account"}>
              <User />
            </NavLink>
            <NavLink>
              <Heart />
            </NavLink>
            <NavLink to={"/cart"}>
              <ShoppingBag />
            </NavLink>
            {user.isAuthenticated ? (
              <button
                onClick={async () => {
                  await user.logout();
                }}
              >
                Logout
              </button>
            ) : (
              <NavLink to={"/login"}>Log In</NavLink>
            )}
          </IconLinks>

          <MobileMenuButton
            onClick={() => {
              if (isMobileMenuOpen) {
                handleCloseMobileMenu();
              } else {
                handleOpenMobileMenu();
              }
            }}
          >
            <Menu size={32} strokeWidth={1} />
          </MobileMenuButton>
        </Side>
        {isMobileMenuOpen && (
          <MobileMenu handleDismiss={handleCloseMobileMenu} />
        )}
      </NavigationBar>

      <SubMenus
        activeMenu={activeMenu}
        setIsSubMenuOpen={setIsSubMenuOpen}
        setActiveMenu={setActiveMenu}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // border: 3px solid red;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const NavigationBar = styled.nav`
  border-bottom: 1px solid black;
  --padding: 40px;
  width: 100%;
  height: var(--navigation-bar-height);
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  padding: var(--padding);

  @media (${QUERIES.laptopAndSmaller}) {
    --padding: 20px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    --padding: 10px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  border: none;
  border-left: 1px solid black;
  background-color: transparent;
  cursor: pointer;
  flex-shrink: 0;
  color: black;
  height: var(--navigation-bar-height);
  width: calc(100px - var(--padding));
  margin-right: calc(-1 * var(--padding));

  @media (max-width: 1100px) {
    display: grid;
    place-content: center;
  }
`;

const Title = styled(Link)`
  // border: 2px solid blue;
  font-family: "Ron";
  font-size: 3rem;
  color: black;
  text-decoration: none;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 2rem;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    font-size: 1.75rem;
    /* vertcal alignment */
    transform: translateY(3px);
  }

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 1.25rem;
    /* vertcal alignment */
    transform: translateY(4px);
  }
`;

const Side = styled.div`
  // border: 2px solid springgreen;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Links = styled.ul`
  // border: 2px solid darkcyan;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4vw;
  padding: 0 20px;

  @media (${QUERIES.laptopAndSmaller}) {
    gap: 2vw;
  }

  @media (${QUERIES.tabletAndSmaller}) {
    display: none;
  }
`;

const IconLinks = styled(Links)`
  // border: 3px dashed red;
  gap: 100px;

  @media (max-width: 1880px) {
    gap: 80px;
  }

  @media (max-width: 1750px) {
    gap: 60px;
  }

  @media (max-width: 1590px) {
    gap: 40px;
  }

  @media (${QUERIES.laptopAndSmaller}) {
    gap: 60px;
  }

  @media (max-width: 1300px) {
    gap: 40px;
  }

  @media (max-width: 1200px) {
    gap: 25px;
  }
`;

const NavLink = styled(Link)`
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 1.5rem;
  color: inherit;
  text-decoration: none;
  flex-shrink: 0;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 1.3rem;
  }
`;

const SubMenuButton = styled.button`
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 1.5rem;
  color: inherit;
  flex-shrink: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media (${QUERIES.laptopAndSmaller}) {
    font-size: 1.3rem;
  }
`;

export default Navigation;
