import React from "react";
import clsx from "clsx";

import { ReactComponent as CaretLeft } from "../images/CaretLeft.svg";
import { ReactComponent as CaretRight } from "../images/CaretRight.svg";

export function ArrowControls({
  isLeftActive,
  isRightActive,
  onLeftClick,
  onRightClick,
}) {
  return (
    <div className="flex items-center space-x-2">
      <ArrowButton
        disabled={!isLeftActive}
        onClick={onLeftClick}
        className="rounded-l-xl"
      >
        <CaretLeft className="w-4 h-4" />
      </ArrowButton>
      <ArrowButton
        disabled={!isRightActive}
        onClick={onRightClick}
        className="rounded-r-xl"
      >
        <CaretRight className="w-4 h-4" />
      </ArrowButton>
    </div>
  );
}

function ArrowButton({ className, children, ...props }) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center h-12 w-12 focus:outline-none focus:ring bg-gradient-to-b",
        "from-gray-100 to-gray-100 hover:to-gray-50 disabled:from-gray-50 shadow active:shadow-inner ",
        "dark:from-gray-600 dark:to-gray-700 dark:hover:to-gray-600 dark:active:from-gray-800 dark:active:to-gray-700",
        "disabled:bg-gray-500 dark:disabled:bg-gray-800 disabled:cursor-default",
        "disabled:shadow-none text-gray-700 disabled:text-gray-400",
        "dark:text-gray-100 dark:disabled:text-gray-300 dark:disabled:from-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
