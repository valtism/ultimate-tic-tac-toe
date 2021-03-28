import { ReactComponent as CaretLeft } from "../images/CaretLeft.svg";
import { ReactComponent as CaretRight } from "../images/CaretRight.svg";

export function ArrowControls({ onLeftClick, onRightClick }) {
  return (
    <div className="flex items-center space-x-2 text-white">
      <button
        onClick={onLeftClick}
        className="bg-gray-500 hover:bg-gray-700 p-2 rounded-lg active:bg-gray-800 focus:outline-none focus:ring"
      >
        <CaretLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onRightClick}
        className="bg-gray-500 hover:bg-gray-700 p-2 rounded-lg active:bg-gray-800 focus:outline-none focus:ring"
      >
        <CaretRight className="w-4 h-4" />
      </button>
    </div>
  );
}
