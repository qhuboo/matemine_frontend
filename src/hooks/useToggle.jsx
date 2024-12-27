import { useCallback, useState } from "react";

export default function useToggle(initialValue = false) {
  if (typeof initialValue !== "boolean") {
    console.warn("Invalid type of useToggle");
  }

  const [value, setValue] = useState(initialValue);

  const toggleValue = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, toggleValue];
}
