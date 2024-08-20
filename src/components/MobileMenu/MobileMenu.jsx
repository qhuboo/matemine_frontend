import styled, { keyframes } from "styled-components";
import Drawer from "../Drawer";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function MobileMenu({ handleDismiss }) {
  return (
    <MobileMenuDrawer handleDismiss={handleDismiss}>
      <Wrapper>
        <Title>All Platforms</Title>
        <Root type="single" collapsible>
          <Item value="item-1">
            <Header asChild>
              <Trigger>
                <Title>Nintendo</Title> <ChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
                voluptates illum debitis sunt aliquam, similique ex quasi,
                laborum quo beatae vel voluptatem a! Cum, tenetur!
              </div>
            </Content>
          </Item>
          <Item value="item-2">
            <Header asChild>
              <Trigger>
                <Title>Sega</Title> <ChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                doloremque libero odit iste distinctio laudantium.
              </div>
            </Content>
          </Item>
          <Item value="item-3">
            <Header asChild>
              <Trigger>
                <Title>PlayStation</Title> <ChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique natus dolor ducimus. Quos veritatis, consectetur sit
                vero ratione ut eos ipsum eveniet? Temporibus libero, aliquam
                nostrum, laboriosam dolore a itaque odit ad perspiciatis
                blanditiis corrupti iure rem repudiandae saepe! Voluptas quia
                nam mollitia sit praesentium provident eum officiis adipisci
                quas!
              </div>
            </Content>
          </Item>
          <Item value="item-4">
            <Header asChild>
              <Trigger>
                <Title>Xbox</Title> <ChevronDownIcon />
              </Trigger>
            </Header>
            <Content>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique natus dolor ducimus. Quos veritatis, consectetur sit
                vero ratione ut eos ipsum eveniet? Temporibus libero, aliquam
                nostrum, laboriosam dolore a itaque odit ad perspiciatis
                blanditiis corrupti iure rem repudiandae saepe! Voluptas quia
                nam mollitia sit praesentium provident eum officiis adipisci
                quas!
              </div>
            </Content>
          </Item>
        </Root>
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
  color: darkgray;
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="closed"] {
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
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
`;

export default MobileMenu;
