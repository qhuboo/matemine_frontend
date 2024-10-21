import { useCallback } from "react";

export default function useScrollLock(wrapperRef) {
  const lockScroll = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.overflow = "hidden";
    }
  }, [wrapperRef]);

  const unlockScroll = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.overflow = "visible";
    }
  }, [wrapperRef]);

  return {
    lockScroll,
    unlockScroll,
  };
}
