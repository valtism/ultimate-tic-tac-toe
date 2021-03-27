import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { usePrefersDarkMode } from "./usePrefersDarkMode";

export function useDarkMode() {
  const [userEnabled, setUserEnabled] = useLocalStorage("dark-mode");
  const prefersDarkMode = usePrefersDarkMode();

  const enabled = userEnabled === undefined ? prefersDarkMode : userEnabled;

  useEffect(() => {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [enabled]);

  return [enabled, setUserEnabled];
}
