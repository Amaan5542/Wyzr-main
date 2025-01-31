"use client";
import React, { useState } from "react";
import classNames from "classnames";
import genArray from "@/lib/utils/genArray";

type ProgressBarProps = {
  children?: React.ReactNode;
  variant?: "solid" | "dashed";
  stepClassName: string;
  totalSteps: number;
  current: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  children,
  stepClassName: cm,
  variant = "dashed",
  totalSteps,
  current,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [stepArray] = useState(genArray<string>(totalSteps, ""));
  // Define a base class for the steps
  const stepBaseClass = "flex flex-row justify-around";
  return (
    <div
      className={classNames(stepBaseClass, { "gap-2": variant === "dashed" })}
    >
      {stepArray.map((_, key) => (
        <div
          className={classNames(cm, {
            "opacity-40": key > current,
            "opacity-100": key <= current,
          })}
          key={key}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
