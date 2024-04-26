import { useState } from "react";
import styled from "styled-components";
import Drawer from "../Drawer";

import useToggle from "../../hooks/use-toggle";

function Navigation() {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <NavigationBar>
      <Logo>
        <img src="/images/logo/user.png" alt="" />
      </Logo>
      <MarketPlace>MarketPlace</MarketPlace>
      <Side />
      <Title>MateMine</Title>
      <Side />
      <SignIn>Sign-in | Create Account</SignIn>
      <Cart>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-shopping-cart"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>0</span>
      </Cart>
      <MobileMenuButton onClick={() => setIsOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </MobileMenuButton>
      {isOpen && (
        <Drawer handleDismiss={setIsOpen}>
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </Drawer>
      )}
    </NavigationBar>
  );
}

const NavigationBar = styled.nav`
  height: 100px;
  background: linear-gradient(to right, #bfc1c2, #f6f7f8 50%, #bfc1c2);
  border: 1px solid #707070;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  font-size: 1.3rem;
  font-family: "Jersey_10";
  color: black;

  @media (max-width: 500px) {
    gap: 10px;
    padding: 10px;
    font-size: 1.3rem;
  }
`;

const Logo = styled.picture`
  //   border: 2px solid red;
  display: inline-block;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  padding: 4px;
  color: black;

  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 300px) {
    width: 75px;
    height: 75px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;

  @media (max-width: 500px) {
    display: none;
  }
`;

const Side = styled.div`
  //   border: 3px solid blue;
  flex: 1;
  height: 100%;
`;

const MarketPlace = styled.button`
  padding: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const SignIn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const Cart = styled.button`
  background-color: transparent;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  color: black;
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

export default Navigation;
