import React from "react";

export function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}) {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold rounded-xl px-4 py-2 transition-all";

  const variantStyle =
    variant === "secondary"
      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
}
