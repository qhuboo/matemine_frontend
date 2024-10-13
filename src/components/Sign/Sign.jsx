import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { User } from "react-feather";
import { styled, keyframes } from "styled-components";

export default function Sign() {
  return (
    <DialogRoot>
      <Dialog.Trigger asChild>
        <User />
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <TabsRoot defaultValue="signin">
            <Tabs.List>
              <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
              <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="sigin">This is where you signin</Tabs.Content>
            <Tabs.Content value="sigup">This is where you signup</Tabs.Content>
          </TabsRoot>
        </DialogContent>
      </Dialog.Portal>
    </DialogRoot>
  );
}

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const DialogRoot = styled(Dialog.Root)`
  isolation: isolate;
`;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 500ms ease;
`;

const DialogContent = styled(Dialog.Content)`
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${contentShow} 1000ms ease;
`;

const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
`;
