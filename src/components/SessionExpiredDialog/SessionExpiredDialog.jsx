import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { keyframes, styled } from "styled-components";

export default function SessionExpiredDialog({
  isSessionExpiredDialogOpen,
  setIsSessionExpiredDialogOpen,
  sessionExpiredLogout,
}) {
  return (
    <AlertDialog.Root
      open={isSessionExpiredDialogOpen}
      onOpenChange={setIsSessionExpiredDialogOpen}
    >
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialog.Title>Session Expired</AlertDialog.Title>
          <AlertDialog.Description>
            Your session has expired. You will be logged out and redirected to
            the login page.
          </AlertDialog.Description>
          <AlertDialog.Action asChild>
            <button onClick={sessionExpiredLogout}>Return to Login</button>
          </AlertDialog.Action>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
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

const AlertDialogOverlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 250ms ease;
`;

const AlertDialogContent = styled(AlertDialog.Content)`
  border: 3px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 600px;
  animation: ${contentShow} 250ms ease;
  overflow: hidden;
  background-color: var(--background-color);
`;
