import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function LogoutDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title />
          <AlertDialog.Description />
          <AlertDialog.Cancel />
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
