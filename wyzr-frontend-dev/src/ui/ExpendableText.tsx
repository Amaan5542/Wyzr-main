"use client";
import { upperFirst } from "@/lib/utils/upperFirst";
import { useState } from "react";
interface ExpandableTextProps {
  text: string;
  maxLength: number;
  className: string;
}

const ExpandableText = ({
  text,
  maxLength,
  className,
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (text.length <= maxLength || isExpanded) {
    return (
      <p
        className={`transition-all duration-500 ease-in-out cursor-pointer  p-0 ${className}`}
        onClick={toggleExpand}
      >
        {upperFirst(text)}
      </p>
    );
  }

  const ellipsizedText = `${upperFirst(text.substr(0, maxLength))}...`;

  return (
    <p
      className={`transition-all duration-500 ease-in-out cursor-pointer  ${className}`}
      onClick={toggleExpand}
    >
      {ellipsizedText}
    </p>
  );
};

export default ExpandableText;
