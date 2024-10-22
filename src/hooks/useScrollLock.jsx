import { useCallback } from "react";

export default function useScrollLock(
  wrapperRef,
  contentWrapperRef,
  scrollPosition
) {
  const lockScroll = useCallback(() => {
    if (wrapperRef.current && contentWrapperRef) {
      contentWrapperRef.current.style.transform = `translateY(-${scrollPosition}px)`;
      wrapperRef.current.style.overflow = "hidden";
    }
  }, [wrapperRef, contentWrapperRef, scrollPosition]);

  const unlockScroll = useCallback(() => {
    if (wrapperRef.current && contentWrapperRef) {
      contentWrapperRef.current.style.transform = "";
      wrapperRef.current.style.overflow = "visible";
    }
  }, [wrapperRef, contentWrapperRef]);

  return {
    lockScroll,
    unlockScroll,
  };
}
