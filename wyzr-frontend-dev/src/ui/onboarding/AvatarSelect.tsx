import React, { useState } from "react";
import Button from "../Button"; // Assuming Button is a custom component
import Image from "next/image";

type AvatarSelectProps = {
  options: { image: string; id: string; text: string }[];
  onDone: (value: { id: string; selected: boolean }[]) => void;
};

const AvatarSelect: React.FC<AvatarSelectProps> = ({ options, onDone }) => {
  const [selectedIds, setSelectedIds] = useState<{ [key: string]: boolean }>(
    {}
  );

  const onClick = (id: string) => {
    setSelectedIds((prevSelectedIds) => ({
      ...prevSelectedIds,
      [id]: !prevSelectedIds[id],
    }));
  };

  const renderAvatar = (option: {
    image: string;
    id: string;
    text: string;
  }) => {
    const isSelected = selectedIds[option.id];
    return (
      <div
        key={option.id}
        onClick={() => onClick(option.id)}
        className={`flex flex-col rounded-[8px]  justify-center cursor-pointer text-center`}
      >
        <Image
          alt={option.text}
          src={option.image}
          height={72}
          width={72}
          objectFit=""
          className={`rounded-full h-[82px] w-[82px] self-center  ${
            isSelected
              ? "border-primary-400 border-4 bg-primary-100 text-primary-400"
              : "border-gray-50 text-gray-50"
          }`}
        ></Image>
        <div className="w-[10ch] self-center text-base text-gray-500">
          {option.text}
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
    <div className="flex flex-col  gap-6 mt-5">
      <div className="grid grid-cols-3 gap-4 columns-3 flex-wrap mb-10">
        {options.map(renderAvatar)}
      </div>
      <div className="flex justify-between mt-auto px-7 absolute bottom-3 w-full left-0">
        <Button fullWidth variant="solid" type="primary" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AvatarSelect;
