import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { User } from "react-feather";
import { styled, keyframes } from "styled-components";
import { forwardRef, useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { QUERIES } from "../../constants";
import { useSearchParams } from "react-router-dom";

export default function AuthDialog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(() => {
    if (searchParams.get("login") === "true") {
      return true;
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState("login");

  return (
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}>
      <DialogRoot open={open} onOpenChange={setOpen} modal={true}>
        <DialogTrigger asChild>
          <User />
        </DialogTrigger>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <Dialog.Title />
            <Dialog.Description />
            <TabsRoot
              defaultValue="login"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="login" asChild>
                  <ForwardedTabsTriggerWrapper>
                    Login
                  </ForwardedTabsTriggerWrapper>
                </TabsTrigger>
                <TabsTrigger value="register" asChild>
                  <ForwardedTabsTriggerWrapper>
                    Register
                  </ForwardedTabsTriggerWrapper>
                </TabsTrigger>
              </TabsList>
              <AnimatePresence initial={false} mode="popLayout">
                {activeTab === "login" && (
                  <TabsContent
                    forceMount
                    key="login"
                    value="login"
                    initial={{ x: `${110 * -1}%`, opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ x: `${110 * -1}%`, opacity: 0 }}
                  >
                    <LoginForm setOpen={setOpen} />
                  </TabsContent>
                )}
                {activeTab === "register" && (
                  <TabsContent
                    forceMount
                    key="register"
                    value="register"
                    initial={{ x: `${110 * 1}%`, opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ x: `${110 * 1}%`, opacity: 0 }}
                  >
                    <RegisterForm setOpen={setOpen} />
                  </TabsContent>
                )}
              </AnimatePresence>
            </TabsRoot>
          </DialogContent>
        </Dialog.Portal>
      </DialogRoot>
    </MotionConfig>
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
  animation: ${overlayShow} 250ms ease;
`;

const DialogTrigger = styled(Dialog.Trigger)`
  cursor: pointer;
`;

const DialogContent = styled(Dialog.Content)`
  border: 3px solid black;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: var(--background-color);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${contentShow} 250ms ease;
  overflow: hidden;
`;

const TabsRoot = styled(Tabs.Root)`
  //   border: 3px solid red;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 800px;
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 1.4rem;

  @media (${QUERIES.tabletAndSmaller}) {
    width: 400px;
    height: 700px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    width: 300px;
  }
`;

const TabsList = styled(Tabs.List)`
  //   border: 2px solid green;
  display: flex;
  flex-shrink: 0;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  //   border: 2px solid blue;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 2px solid black;
  padding: 10px;
  position: relative;
  isolation: isolate;
  cursor: pointer;

  &[data-state="active"] > * {
    background-color: springgreen;
  }
`;

const TabsTriggerActivePill = styled(motion.div)`
  background-color: var(--background-color);
  position: absolute;
  inset: 0;
  z-index: -1;
`;

const TabsContent = styled(motion.create(Tabs.Content))`
  padding: 30px;
`;
