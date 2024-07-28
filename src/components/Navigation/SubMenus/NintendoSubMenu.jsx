import SubMenuWrapper from "./SubMenuWrapper";
import platforms from "../../../platform_data";

export default function NintendoSubMenu({ $isActive }) {
  return (
    <SubMenuWrapper $isActive={$isActive}>
      {platforms.nintendo.map((console) => (
        <div key={console}>{console}</div>
      ))}
    </SubMenuWrapper>
  );
}
