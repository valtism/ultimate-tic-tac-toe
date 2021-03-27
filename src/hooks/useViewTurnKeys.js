import { useEffect } from "react";

export function useViewTurnKeys(turns, setPointer) {
  useEffect(() => {
    function handleKeyUp({ key }) {
      switch (key) {
        case "ArrowLeft":
          return setPointer((pointer) => Math.max(pointer - 1, 0));
        case "ArrowRight":
          return setPointer((pointer) => Math.min(pointer + 1, turns.length));
        case "ArrowUp":
          return setPointer(0);
        case "ArrowDown":
          return setPointer(turns.length);
        default:
          return;
      }
    }
    window.addEventListener("keydown", handleKeyUp);
    return () => window.removeEventListener("keydown", handleKeyUp);
  }, [setPointer, turns.length]);
}
