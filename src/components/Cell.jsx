import React from "react";
import clsx from "clsx";

export function Cell({ isValid, className, children, ...props }) {
  return (
    <button
      className={clsx(
        "relative flex items-center justify-center rounded w-full h-full disabled:cursor-default",
        "m-px", // Hack to fix blur edges in Safari
        "bg-gradient-to-b from-gray-100 to-gray-100 shadow hover:to-gray-50 active:shadow-inner",
        "dark:from-gray-700 dark:to-gray-700 dark:hover:to-gray-600 dark:active:from-gray-800 dark:active:to-gray-800",
        "focus:outline-none focus:ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
