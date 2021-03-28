import { useEffect } from "react";

export function useViewTurnKeys(turns, setPointer) {
  useEffect(() => {
    function handleKeyDown({ key }) {
      switch (key) {
        case "k":
          return setPointer((pointer) => Math.max(pointer - 1, 0));
        case "j":
          return setPointer((pointer) => Math.min(pointer + 1, turns.length));
        case "K":
          return setPointer(0);
        case "J":
          return setPointer(turns.length);
        default:
          return;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setPointer, turns.length]);
}
