import { ReactComponent as X } from "../images/X.svg";
import { ReactComponent as O } from "../images/O.svg";

export function Icon({ type, ...props }) {
  switch (type) {
    case "X":
      return <X {...props} />;
    case "O":
      return <O {...props} />;
    default:
      return <div {...props} />;
  }
}
