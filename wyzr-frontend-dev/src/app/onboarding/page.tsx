"use client";
import TinderSelect from "@/ui/onboarding/TinderSelect";
import PillSelect from "@/ui/onboarding/PillSelect";
import ProgressBar from "@/ui/ProgressBar";
import { useRef, useState } from "react";
import AvatarSelect from "@/ui/onboarding/AvatarSelect";
import {
  OnboardingOptionType,
  onboardingSteps,
} from "@/lib/constants/onboarding-constants";
import TimeSlider from "@/ui/onboarding/TImeSlide";
import { useRouter } from "next/navigation";
import {
  LOCAL_STORAGE_KEYS,
  setJsonToLocalStorage,
} from "@/lib/utils/local-storage";

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const completedStep = currentStep - 1;
  const router = useRouter();
  const obParams = useRef<Record<string, any>>({});
  const gotToNextStep = () => {
    const newStep = currentStep + 1;
    if (newStep < onboardingSteps.length) {
      setCurrentStep(newStep);
    } else {
      setJsonToLocalStorage(LOCAL_STORAGE_KEYS.OB_PARAMS, obParams.current);

      router.push("/register");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen gap-6 px-4 py-10 lg:flex-row lg:gap-0">
      <ProgressBar
        variant="dashed"
        stepClassName="bg-primary-400 justify-center flex rounded-md flex-1 h-[12px]"
        totalSteps={onboardingSteps.length}
        current={currentStep - 1}
      />
      <div className="flex justify-between font-normal leading-6 font-satoshi text-md">
        <div>
          {currentStep}/{onboardingSteps.length}
        </div>
        <div onClick={gotToNextStep} className="underline select-none">
          Skip
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-neue-montreal font-semibold text-[2rem] leading-10">
          {onboardingSteps[currentStep]?.heading}
        </p>
        <p className="font-satoshi font-normal text-lg leading-6 w-[30ch] text-gray-500/85">
          {onboardingSteps[currentStep]?.subHeading}
        </p>
      </div>

      <div className="">
        {onboardingSteps[currentStep].type ===
          OnboardingOptionType.TINDER_SWIPE && (
          <div className="px-6 mt-auto">
            <TinderSelect
              onDone={(value: { id: string; selected: boolean }[]) => {
                // alert(JSON.stringify(value, null, 2));
                obParams.current[onboardingSteps[currentStep].stepId] = value;
                gotToNextStep();
              }}
              options={onboardingSteps[currentStep].options}
            ></TinderSelect>
          </div>
        )}
        {onboardingSteps[currentStep].type ===
          OnboardingOptionType.PILL_SELECT && (
          <PillSelect
            onDone={(value: { id: string; selected: boolean }[]) => {
              // alert(JSON.stringify(value, null, 2));
              obParams.current[onboardingSteps[currentStep].stepId] = value;
              gotToNextStep();
            }}
            options={onboardingSteps[currentStep].options}
          ></PillSelect>
        )}
        {onboardingSteps[currentStep].type ===
          OnboardingOptionType.AVATAR_SELECT && (
          <AvatarSelect
            onDone={(value: { id: string; selected: boolean }[]) => {
              // alert(JSON.stringify(value, null, 2));
              obParams.current[onboardingSteps[currentStep].stepId] = value;
              gotToNextStep();
            }}
            options={onboardingSteps[currentStep].options}
          ></AvatarSelect>
        )}
        {onboardingSteps[currentStep].type ===
          OnboardingOptionType.TIME_SLIDE && (
          <TimeSlider
            onDone={(value: { timeValue: string; period: string }) => {
              // alert(JSON.stringify(value, null, 2));
              obParams.current[onboardingSteps[currentStep].stepId] = value;
              gotToNextStep();
            }}
            // options={onboardingSteps[currentStep].options}
          ></TimeSlider>
        )}
      </div>
    </div>
  );
}
