import { ReactComponent as X } from "../images/X.svg";
import { ReactComponent as O } from "../images/O.svg";
import clsx from "clsx";

export function Icon({ type, className, ...props }) {
  switch (type) {
    case "X":
      return <X className={clsx("text-red-500", className)} {...props} />;
    case "O":
      return <O className={clsx("text-blue-500", className)} {...props} />;
    default:
      return <div {...props} />;
  }
}
