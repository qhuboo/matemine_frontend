import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { keyframes, styled } from "styled-components";
import { QUERIES } from "../../constants";

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
          <AlertDialogTitle>Session Expired</AlertDialogTitle>
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
  // border: 3px solid black;
  padding: 30px;
  border-radius: 6px;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
  animation: ${contentShow} 250ms ease;
  overflow: hidden;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  gap: 30px;

  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);

  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 1.4rem;

  @media (${QUERIES.tabletAndSmaller}) {
    // border: 2px solid red;
    width: 400px;
    height: 275px;
    font-size: 1.2rem;
    gap: 20px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    // border: 2px solid blue;
    width: 250px;
    height: 275px;
    font-size: 1.1rem;
    gap: 20px;
  }
`;

const AlertDialogTitle = styled(AlertDialog.Title)`
  text-align: center;
`;
