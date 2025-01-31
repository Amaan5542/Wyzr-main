"use client";
import React, { useState } from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  type: "primary" | "secondary" | "gray";
  variant: "solid" | "outline";
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg" | "base";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  type,
  variant,
  isLoading = false,
  fullWidth = false,
  size = "base",
  onClick,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const baseStyles =
    "px-4 py-3  rounded-lg  font-neue-montreal font-medium focus:outline-none box-border border-[3px]";
  const fixedWidthStyles = "w-32"; // fixed width
  const fullWidthStyles = "w-full"; // full width
  const loadingStyles = "opacity-50 cursor-not-allowed";
  const typeStyles = {
    primary:
      "bg-primary-500 hover:bg-primary-600 border-primary-500 text-white",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 border-secondary-500  text-white",
    gray: "bg-gray-500 hover:bg-gray-600 border-gray-500  text-white",
  };
  const sizeStyles = {
    sm: "px-2 py-2 text-sm",
    md: "px-3 py-3 text-base",
    lg: "px-4 py-3 text-xl",
    base: "px-4 py-3 text-base",
  };
  const outlineTypeStyles = {
    primary:
      "border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white-",
    secondary:
      "border-green-500 text-green-500 hover:bg-green-500 hover:text-white-",
    gray: "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white-",
  };

  const variantStyles = {
    solid: typeStyles[type],
    outline: `bg-transparent  hover:bg-opacity-20 ${outlineTypeStyles[type]}`,
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoading && onClick) {
      setIsClicked(true);
      onClick(e);
      setTimeout(() => setIsClicked(false), 200); // Reset click state after 200ms
    }
  };

  const buttonClasses = classNames(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    isLoading ? loadingStyles : "",
    fullWidth ? fullWidthStyles : fixedWidthStyles
  );

  return (
    <button
      {...props}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
