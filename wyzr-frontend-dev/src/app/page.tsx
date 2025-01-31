import Image from "next/image";
import Button from "@/ui/Button";
import Link from "next/link";
import { RegistrationPageMode } from "@/lib/types";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen gap-4 lg:flex-row lg:gap-0">
      <div className="flex flex-col col-span-1 gap-4 lg:basis-1/2 lg:justify-center lg:rounded-md overflow-clip ">
        <div className=" w-full lg:w-[33rem] lg:mx-auto relative justify-center  h-[138px] bg-dark  ">
          <Image
            src="/images/ob-1st-row.png"
            alt="Image showing books"
            className="self-center h-[138px] "
            layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className=" w-full lg:w-[33rem] lg:mx-auto relative justify-center  h-[138px] bg-dark  ">
          <Image
            src="/images/ob-2nd-row.png"
            alt="Image showing books"
            className="self-center h-[138px] "
            layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        <div className=" w-full lg:w-[33rem] lg:mx-auto relative justify-center  h-[138px] bg-dark  ">
          <Image
            src="/images/ob-3rd-row.png"
            alt="Image showing books"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="self-center h-[138px] "
            layout="fill"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col p-5 mt-3 lg:basis-1/3 lg:mt-0 gap-7 lg:justify-center lg:self-center ">
        <div className="flex flex-col gap-3 ">
          <p className="font-neue-montreal font-semibold leading-10 text-[32px] ">
            Read on the go with Wyzr.
          </p>
          <p className="text-base font-normal leading-6 text-gray-400 font-satoshi">
            Read books from your favourite influencers and know their story.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <Link href={"/onboarding"}>
            <Button
              type="primary"
              fullWidth={true}
              isLoading={false}
              variant="solid"
              // onClick={onGetStartedBtnClicked}
            >
              Get me Started
            </Button>
          </Link>
          <Link href={`/register?mode=${RegistrationPageMode.LOGIN}`}>
            <Button
              type="primary"
              fullWidth={true}
              isLoading={false}
              variant="outline"
            >
              Login
            </Button>
          </Link>
        </div>
        <div>
          <p className="border-l-4 border-[#5BCA95] pl-3 font-satoshi font-normal text-base leading-6 text-gray-400">
            Our vision with Wyzr is to become your go to platform to obtain
            knowledge.
          </p>
        </div>
      </div>
      <div className="relative flex justify-center bottom-5">
        <Link href="/home">
          <div className="h-0 border-4 border-gray-400 rounded-lg w-28"></div>
        </Link>
      </div>
    </div>
  );
}
