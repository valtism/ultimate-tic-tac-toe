import { useEffect, useState } from "react";

export function usePrefersDarkMode() {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const handleChange = ({ matches }) => setDark(matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChange);
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", handleChange);
  }, []);
  return dark;
}
