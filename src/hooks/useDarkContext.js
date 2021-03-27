import { useContext } from "react";
import { DarkContext } from "../context/DarkContext";

export function useDarkContext() {
  return useContext(DarkContext);
}
