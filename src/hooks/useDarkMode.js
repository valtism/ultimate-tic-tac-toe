import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { usePrefersDarkMode } from "./usePrefersDarkMode";

export function useDarkMode() {
  const [userEnabled, setUserEnabled] = useLocalStorage("dark-mode");
  const prefersDarkMode = usePrefersDarkMode();

  const enabled = userEnabled === undefined ? prefersDarkMode : userEnabled;

  useEffect(() => {
    const className = "dark";
    const element = window.document.body;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);

  return [enabled, setUserEnabled];
}
