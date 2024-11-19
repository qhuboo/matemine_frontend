import Consoles from "./Consoles";

export default function Filters({ isChecked, handleCheckBoxChange }) {
  return (
    <Consoles
      isChecked={isChecked}
      handleCheckBoxChange={handleCheckBoxChange}
    />
  );
}
