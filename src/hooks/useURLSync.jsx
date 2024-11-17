import { useState, useEffect } from "react";

export default function useURLSync(
  searchParams,
  setSearchParams,
  paramName,
  type = "string",
  initialValue = ""
) {
  // Type validation
  if (type === "array" && !Array.isArray(initialValue)) {
    throw new Error(
      `useURLSync: initialValue must be an array when type is "array"`
    );
  }
  if (type === "string" && typeof initialValue !== "string") {
    throw new Error(`
        useURLSync: initialValue must be a string when type is "string"`);
  }

  // Intiliaze state from URL search params according to the paramName if it exists,
  // if not, return the initial value
  const [state, setState] = useState(() => {
    if (searchParams.has(paramName)) {
      const paramValue = searchParams.get(paramName);
      if (paramValue) {
        if (type === "string") {
          return paramValue;
        } else if (type === "array") {
          return paramValue.split(",");
        }
      }
    }
    return initialValue;
  });

  // Update the URL when state changes
  useEffect(() => {
    // Create a new URL search params object from a copy of the current one
    const newSearchParams = new URLSearchParams(searchParams);
    let shouldChange = false;

    if (state.length > 0) {
      const currentParamValue = searchParams.get(paramName);

      if (type === "array") {
        const newParamValue = state.join(",");
        if (newParamValue !== currentParamValue) {
          newSearchParams.set(paramName, newParamValue);
          shouldChange = true;
        }
      } else if (type === "string") {
        const newParamValue = state;
        if (newParamValue !== currentParamValue) {
          newSearchParams.set(paramName, newParamValue);
          shouldChange = true;
        }
      }
    } else if (newSearchParams.has(paramName)) {
      newSearchParams.delete(paramName);
      shouldChange = true;
    }

    if (shouldChange) {
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [state]);

  // Update state when URL seach params changes
  useEffect(() => {
    const paramValue = searchParams.get(paramName);
    let newStateValue = initialValue;
    if (paramValue) {
      if (type === "array") {
        newStateValue = paramValue.split(",");
      } else if (type === "string") {
        newStateValue = paramValue;
      }
      if (JSON.stringify(newStateValue) !== JSON.stringify(state)) {
        setState(newStateValue);
      }
    } else if (state !== initialValue) {
      setState([]);
    }
  }, [searchParams]);

  return [state, setState];
}
