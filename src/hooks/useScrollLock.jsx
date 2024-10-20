import { useEffect, useCallback, useState } from "react";

export default function useScrollLock() {
  const lockScroll = useCallback(() => {
    /* ...... */
  }, []);

  const unlockScroll = useCallback(() => {
    /* ...... */
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
}
