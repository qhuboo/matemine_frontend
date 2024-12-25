import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Drawer from "../Drawer";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import platforms from "../../platform_data";
import { User, LogIn, LogOut, Heart, ShoppingBag } from "react-feather";
import useAuth from "../Auth/hooks/useAuth";
import { QUERIES } from "../../constants";

export default function MobileMenu({ handleDismiss }) {
  const user = useAuth();
  console.log(Object.keys(platforms));

  return (
    <MobileMenuDrawer handleDismiss={handleDismiss}>
      <Wrapper>
        <Title>
          <NavLink
            to={{
              pathname: "/marketplace",
              search: "?perPage=12&page=1&sort=alpha-asc",
            }}
            onClick={() => handleDismiss()}
          >
            All Platforms
          </NavLink>
        </Title>
        <Root type="single" collapsible>
          {Object.keys(platforms).map((platform) => {
            return (
              <Item value={platform} key={platform}>
                <Header asChild>
                  <Trigger>
                    <Title>{platform}</Title>
                    <StyledChevronDownIcon />
                  </Trigger>
                </Header>
                <Content>
                  <ContentWrapper>
                    {platforms[platform].map((console) => {
                      return (
                        <NavLink
                          onClick={handleDismiss}
                          to={{
                            pathname: "/marketplace",
                            search: `?perPage=12&page=1&sort=alpha-asc&${platform}=${console}`,
                          }}
                          key={console}
                        >
                          {console}
                        </NavLink>
                      );
                    })}
                  </ContentWrapper>
                </Content>
              </Item>
            );
          })}
        </Root>

        <UserLinks>
          <NavLink to={"/account"} onClick={() => handleDismiss()}>
            <UserIcon />
          </NavLink>
          <NavLink onClick={() => handleDismiss()}>
            <HeartIcon />
          </NavLink>
          <NavLink to={"/cart"} onClick={() => handleDismiss()}>
            <ShoppingBagIcon />
          </NavLink>
        </UserLinks>
        {user.isAuthenticated ? (
          <LogoutButton
            onClick={async () => {
              await user.logout();
              handleDismiss();
            }}
          >
            Log out <LogOut />
          </LogoutButton>
        ) : (
          <LoginButton to={"/login"} onClick={() => handleDismiss()}>
            Log in <LogIn />
          </LoginButton>
        )}
      </Wrapper>
    </MobileMenuDrawer>
  );
}

const slideDown = keyframes`
from{
  height: 0;
}
  to {
  height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
from {
  height: var(--radix-accordion-content-height)
}
  to {
  height: 0;
  }
`;
const MobileMenuDrawer = styled(Drawer)`
  margin-top: 50px;
`;

const Wrapper = styled.div`
  // border: 3px solid red;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  // border: 2px solid green;
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 3rem;

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 2.5rem;
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  width: 32px;
  height: 32px;
  transition: transform 300ms ease;
`;

const Root = styled(Accordion.Root)`
  // border: 3px solid red;
  width: 100%;
`;

const Item = styled(Accordion.Item)`
  // border: 3px solid green;
  overflow: hidden;
`;

const Header = styled(Accordion.Header)``;

const Content = styled(Accordion.Content)`
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="closed"] {
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

const ContentWrapper = styled.div`
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Trigger = styled(Accordion.Trigger)`
  // border: 3px solid yellow;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 0;

  &[data-state="open"] > ${StyledChevronDownIcon} {
    transform: rotate(180deg);
  }
`;

const UserLinks = styled.div`
  // border: 3px dashed springgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 40px;

  @media (${QUERIES.mobileAndSmaller}) {
    justify-content: space-evenly;
    gap: 10px;
  }
`;

const UserIcon = styled(User)`
  padding: 25px;
  width: 80px;
  height: 80px;
  flex: 1;
`;

const HeartIcon = styled(Heart)`
  padding: 25px;
  width: 80px;
  height: 80px;
  flex: 1;
  flex-shrink: 0;
`;

const ShoppingBagIcon = styled(ShoppingBag)`
  padding: 25px;
  width: 80px;
  height: 80px;
  flex: 1;
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 6px;
  color: black;
`;

const LoginButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  padding: 10px;
  background-color: rgb(239, 239, 239);
  border: 1px solid black;
  border-radius: 6px;
`;
