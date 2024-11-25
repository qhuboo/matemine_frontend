import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Drawer from "../Drawer";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import platforms from "../../platform_data";
import AuthDialog from "../Auth/AuthDialog";

function MobileMenu({ handleDismiss }) {
  return (
    <MobileMenuDrawer handleDismiss={handleDismiss}>
      <Wrapper>
        <Title>
          <NavLink
            to={{
              pathname: "/marketplace",
              search: "?platforms=nintendo,sega,playstation,xbox",
            }}
            onClick={() => handleDismiss()}
          >
            All Platforms
          </NavLink>
        </Title>
        <Root type="single" collapsible>
          <Item value="item-1">
            <Header asChild>
              <Trigger>
                <Title>Nintendo</Title>
                <StyledChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <ContentWrapper>
                {platforms.nintendo.map((console) => {
                  return <div key={console}>{console}</div>;
                })}
              </ContentWrapper>
            </Content>
          </Item>
          <Item value="item-2">
            <Header asChild>
              <Trigger>
                <Title>Sega</Title> <StyledChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <ContentWrapper>
                {platforms.sega.map((console) => {
                  return <div key={console}>{console}</div>;
                })}
              </ContentWrapper>
            </Content>
          </Item>
          <Item value="item-3">
            <Header asChild>
              <Trigger>
                <Title>PlayStation</Title> <StyledChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <ContentWrapper>
                {platforms.playstation.map((console) => {
                  return <div key={console}>{console}</div>;
                })}
              </ContentWrapper>
            </Content>
          </Item>
          <Item value="item-4">
            <Header asChild>
              <Trigger>
                <Title>Xbox</Title> <StyledChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <ContentWrapper>
                {platforms.xbox.map((console) => {
                  return <div key={console}>{console}</div>;
                })}
              </ContentWrapper>
            </Content>
          </Item>
        </Root>
        <AuthDialog />
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

const Wrapper = styled.div`
  // border: 3px solid red;
  padding: 10px;
`;

const Title = styled.div`
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 3rem;
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

const MobileMenuDrawer = styled(Drawer)`
  margin-top: 50px;
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

export default MobileMenu;
