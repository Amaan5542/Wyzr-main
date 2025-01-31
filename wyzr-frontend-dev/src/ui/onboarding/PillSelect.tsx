import React, { useState } from "react";
import Button from "../Button"; // Assuming Button is a custom component

type PillSelectProps = {
  options: { image: string; id: string; text: string }[];
  onDone: (value: { id: string; selected: boolean }[]) => void;
};

const PillSelect: React.FC<PillSelectProps> = ({ options, onDone }) => {
  const [selectedIds, setSelectedIds] = useState<{ [key: string]: boolean }>(
    {}
  );

  const onClick = (id: string) => {
    setSelectedIds((prevSelectedIds) => ({
      ...prevSelectedIds,
      [id]: !prevSelectedIds[id],
    }));
  };

  const renderPill = (option: { image: string; id: string; text: string }) => {
    const isSelected = selectedIds[option.id];
    return (
      <div
        key={option.id}
        onClick={() => onClick(option.id)}
        className={`border-2 px-6 py-[6px] rounded-[8px] cursor-pointer ${
          isSelected
            ? "border-primary-300 bg-primary-100 text-primary-400"
            : "border-primary-300 text-primary-400"
        } text-center`}
      >
        <div className="self-center leading-6">{option.text}</div>
      </div>
    );
  };
  const renderCancelPill = (option: {
    image: string;
    id: string;
    text: string;
  }) => {
    return (
      <div
        key={`cancel-${option.id}`}
        className={` bg-primary-100 hover:opacity-80 text-primary-400 stroke-primary-400 hover:stroke-primary-300 flex h-fit  rounded-[8px] cursor-pointer  text-center`}
      >
        <div className="self-center pl-6 py-1.5 uppercase- text-sm font-medium-">
          {option.text}
        </div>
        <div
          className="h-fit self-center ml-3  pr-6"
          onClick={() => onClick(option.id)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L8 8M8 8L12 4M8 8L4 4M8 8L12 12"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    const result = Object.entries(selectedIds)
      .filter(([_, selected]) => selected)
      .map(([id]) => ({ id, selected: true }));
    onDone(result);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex gap-[10px] flex-wrap mb-5">
        {options.map(renderPill)}
      </div>
      <div className="flex gap-[10px] flex-wrap  h-32  overflow-y-scroll">
        {options.filter((_) => selectedIds[_.id]).map(renderCancelPill)}
      </div>
      <div className="flex justify-between mt-auto sticky bottom-1   w-full">
        <Button fullWidth variant="solid" type="primary" onClick={handleSubmit}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default PillSelect;
