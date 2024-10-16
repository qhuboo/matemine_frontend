import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { User } from "react-feather";
import { styled, keyframes } from "styled-components";
import { forwardRef } from "react";
import { div } from "framer-motion/client";

export default function Sign() {
  return (
    <DialogRoot>
      <Dialog.Trigger asChild>
        <User />
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Dialog.Title />
          <Dialog.Description />
          <TabsRoot defaultValue="signin">
            <TabsList>
              <TabsTrigger value="signin" asChild>
                <ForwardedTabsTriggerWrapper>
                  Sign In
                </ForwardedTabsTriggerWrapper>
              </TabsTrigger>
              <TabsTrigger value="signup" asChild>
                <ForwardedTabsTriggerWrapper>
                  Sign Up
                </ForwardedTabsTriggerWrapper>
              </TabsTrigger>
            </TabsList>
            <Tabs.Content value="signin">This is where you signin</Tabs.Content>
            <Tabs.Content value="signup">This is where you signup</Tabs.Content>
          </TabsRoot>
        </DialogContent>
      </Dialog.Portal>
    </DialogRoot>
  );
}

function TabsTriggerWrapper({ className, children, ...delegated }, ref) {
  const active = delegated["data-state"] === "active";
  return (
    <div ref={ref} className={className} {...delegated}>
      {children}
      {active && <TabsTriggerActivePill layoutId="something" />}
    </div>
  );
}

const ForwardedTabsTriggerWrapper = forwardRef(TabsTriggerWrapper);

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
  border: 3px solid red;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 1000px;
`;

const TabsList = styled(Tabs.List)`
  //   border: 2px solid green;
  display: flex;
  flex-shrink: 0;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  border: 2px solid blue;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 2px solid black;
  padding: 0;
  position: relative;
  isolation: isolate;

  &[data-state="active"] > * {
    background-color: springgreen;
  }
`;

const TabsTriggerActivePill = styled(motion.div)`
  background-color: white;
  position: absolute;
  inset: 0;
  z-index: -1;
`;
