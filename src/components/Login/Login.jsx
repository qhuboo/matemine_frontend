import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export default function Login() {
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>This is the title</Dialog.Title>
          <Dialog.Description>This is the description</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: (0, 0, 0, 0.5);
  z-index: 1000;
`;

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  z-index: 1001;
`;
