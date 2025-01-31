import React, { useState } from "react";
import Button from "../Button";
import classes from "@/styles/time-slider.module.css";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";

type TImeSliderProps = {
  //   options: { image: string; id: string; text: string }[];
  onDone: (value: { timeValue: string; period: string }) => void;
};

const TimeSlider: React.FC<TImeSliderProps> = ({ onDone }) => {
  const [timeValue, setTimeValue] = useState(0); // Time in minutes from 0 to 719
  const [period, setPeriod] = useState("AM"); // AM/PM

  // Convert minutes to a time string
  const getTimeString = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs % 12 || 12}:${mins < 10 ? "0" + mins : mins}`;
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(parseInt(e.target.value, 10)); // Also specify the radix parameter for parseInt
  };

  // Handle period change
  const handlePeriodChange = (e: any) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-4 gap-10 py-10 text-black-700">
      <div className="flex font-satoshi text-[40px] font-medium w-[6.7ch] justify-between self-center ">
        <div> {getTimeString(timeValue)} </div>
        <select
          value={period}
          onChange={handlePeriodChange}
          className={`bg-transparent ${classes["slider-input"]}`}
        >
          <option className="text-lg" value="AM">
            AM
          </option>
          <option className="text-lg" value="PM">
            PM
          </option>
        </select>
      </div>

      <div className="flex flex-col w-full ">
        <div className="flex ">
          <input
            type="range"
            min="0"
            max="719"
            value={timeValue}
            onChange={handleSliderChange}
            className=" w-full accent-primary-200 outline-none "
          />
        </div>
        <div className="flex justify-between stroke-[#292D32] ">
          <SunIcon className="  stroke-[1.5]" />
          <MoonIcon className="stroke-[1.5] h-6 w-6" />
        </div>
        <div className="flex justify-between mt-auto absolute  bottom-1   w-full left-0 p-4">
          <Button
            fullWidth
            variant="solid"
            type="primary"
            onClick={() =>
              onDone({ timeValue: getTimeString(timeValue), period: period })
            }
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;
