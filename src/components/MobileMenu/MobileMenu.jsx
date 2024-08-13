import styled from "styled-components";
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
          <Accordion.Content>This is the content</Accordion.Content>
        </Item>
        <Item value="item-2">
          <Header asChild>
            <Trigger>
              Item 2 <ChevronDownIcon />
            </Trigger>
          </Header>
          <Accordion.Content>This is the content</Accordion.Content>
        </Item>
      </Root>
    </MobileMenuDrawer>
  );
}

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
