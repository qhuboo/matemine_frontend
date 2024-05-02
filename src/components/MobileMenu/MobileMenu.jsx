import Drawer from "../Drawer";

function MobileMenu({ handleDismiss }) {
  return (
    <Drawer handleDismiss={handleDismiss}>
      <ul>
        <li>Marketplace</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </Drawer>
  );
}

export default MobileMenu;
