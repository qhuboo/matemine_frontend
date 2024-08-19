import styled, { keyframes } from "styled-components";
import Drawer from "../Drawer";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function MobileMenu({ handleDismiss }) {
  return (
    <MobileMenuDrawer handleDismiss={handleDismiss}>
      <Root type="single" collapsible>
        <Item value="item-1">
          <Header asChild>
            <Trigger>
              Item 1 <ChevronDownIcon />
            </Trigger>
          </Header>
          <Content>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              natus dolor ducimus. Quos veritatis, consectetur sit vero ratione
              ut eos ipsum eveniet? Temporibus libero, aliquam nostrum,
              laboriosam dolore a itaque odit ad perspiciatis blanditiis
              corrupti iure rem repudiandae saepe! Voluptas quia nam mollitia
              sit praesentium provident eum officiis adipisci quas!
            </div>
          </Content>
        </Item>
        <Item value="item-2">
          <Header asChild>
            <Trigger>
              Item 2 <ChevronDownIcon />
            </Trigger>
          </Header>
          <Content>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              natus dolor ducimus. Quos veritatis, consectetur sit vero ratione
              ut eos ipsum eveniet? Temporibus libero, aliquam nostrum,
              laboriosam dolore a itaque odit ad perspiciatis blanditiis
              corrupti iure rem repudiandae saepe! Voluptas quia nam mollitia
              sit praesentium provident eum officiis adipisci quas!
            </div>
          </Content>
        </Item>
        <Item value="item-3">
          <Header asChild>
            <Trigger>
              Item 3 <ChevronDownIcon />
            </Trigger>
          </Header>
          <Content>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              natus dolor ducimus. Quos veritatis, consectetur sit vero ratione
              ut eos ipsum eveniet? Temporibus libero, aliquam nostrum,
              laboriosam dolore a itaque odit ad perspiciatis blanditiis
              corrupti iure rem repudiandae saepe! Voluptas quia nam mollitia
              sit praesentium provident eum officiis adipisci quas!
            </div>
          </Content>
        </Item>
      </Root>
    </MobileMenuDrawer>
  );
}

const slideDown = keyframes`
from{
  height: 0;
}
  to {
  height: 350px}
`;

const slideUp = keyframes`
from {
  height: 350px;
}
  to {
  height: 0;
  }
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
`;

const Header = styled(Accordion.Header)``;

const Content = styled(Accordion.Content)`
  padding-left: 10px;
  color: darkgray;

  &[data-state="open"] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="closed"] {
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

const Trigger = styled(Accordion.Trigger)`
  // border: 3px solid yellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: transparent;
  border: none;
`;

export default MobileMenu;
