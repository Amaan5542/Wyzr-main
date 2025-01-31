import React, { useRef, useState } from "react";
import Image from "next/image";

type TinderSelectProps = {
  options: { image: string; id: string }[];
  onDone: (value: { id: string; selected: boolean }[]) => void;
};

const TinderSelect: React.FC<TinderSelectProps> = ({ options, onDone }) => {
  const [current, setCurrent] = useState<number>(0);
  const selection = useRef<{ id: string; selected: boolean }[]>([]);

  const onClick = (id: string, selected: boolean) => {
    const found = selection.current.find((item) => item.id === id);
    if (!found) {
      selection.current.push({ id, selected });
    } else {
      found.selected = selected;
    }

    const nextIndex = current + 1;
    if (nextIndex < options.length) {
      setCurrent(nextIndex);
    } else {
      onDone(selection.current);
    }
  };

  const renderImage = (
    index: number,
    zIndex: string,
    rotation: string = ""
  ) => {
    return (
      options[index] && (
        <Image
          src={options[index].image}
          alt={`Option ${index}`}
          height={360}
          width={270}
          quality={100}
          className={`rounded-xl absolute transition-all duration-150 ${zIndex} ${rotation}`}
        />
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid place-content-center min-h-[35rem] place-items-center">
        {renderImage(current, "z-50")}
        {renderImage(current + 1, "z-49", "rotate-[5.3deg]")}
        {renderImage(current + 2, "z-48", "-rotate-[5.3deg]")}
      </div>
      <div className="fixed flex justify-between bottom-3 inset-x-7">
        {" "}
        {/* Left Button */}
        <button
          onClick={() => onClick(options[current]?.id, false)}
          className="bg-primary-500 opacity-80 focus:opacity-100 hover:opacity-90 disabled:opacity-55 p-5 grid place-items-center text-white rounded-full h-[72px] w-[72px] text-3xl"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" fill="#005DFF" />
            <path
              d="M8 24L16 16M16 16L24 8M16 16L8 8M16 16L24 24"
              stroke="#FAFBF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* Right Button */}
        <button
          onClick={() => onClick(options[current]?.id, true)}
          className="bg-primary-500 opacity-80 focus:opacity-100 hover:opacity-90 disabled:opacity-55 p-5 grid place-items-center text-white rounded-full h-[72px] w-[72px] text-3xl"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" fill="#005DFF" />
            <path
              d="M5.3335 16.4992L12.4686 23.6266L13.0386 22.6298C16.0952 17.2851 20.3252 12.7041 25.4098 9.23209L26.6668 8.37372"
              stroke="#FAFBF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TinderSelect;
