"use client";
import { useEffect, useState } from "react";
import Button from "@/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { RegistrationPageMode, UserProfile } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useUserProfileStore } from "@/store/user-profile";
import { FieldValues, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LOCAL_STORAGE_KEYS,
  getDataFromLocalStorage,
  removeFromLocalStorage,
} from "@/lib/utils/local-storage";

interface PayloadData {
  email: string;
  password: string;
  firstName?: string; // Mark as optional
  lastName?: string; // Mark as optional
}
interface Payload {
  data: PayloadData;
}

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  pass: z.string().min(8, "Password must be at least 8 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  pass: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;
type LoginSchema = z.infer<typeof loginSchema>;

function getPageModeFromSearchParams(
  params: URLSearchParams
): RegistrationPageMode {
  const mode = params.get("mode");
  return Object.values(RegistrationPageMode).includes(
    mode as RegistrationPageMode
  )
    ? (mode as RegistrationPageMode)
    : RegistrationPageMode.LOGIN;
}

export default function Register() {
  const { syncUser, syncObParams } = useUserProfileStore();
  const searchParams = useSearchParams();
  const [pageMode, setPageMode] = useState<RegistrationPageMode>(
    getPageModeFromSearchParams(searchParams)
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema & LoginSchema>({
    resolver: zodResolver(
      pageMode === RegistrationPageMode.SIGN_UP ? signUpSchema : loginSchema
    ),
  });

  const onSignUp = async (name: string, email: string, pass: string) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`;
    const [firstName, lastName = ""] = name.trim().split(" ");

    const payload: Payload = {
      data: {
        email: email,
        password: pass,
        firstName: firstName,
        lastName: lastName,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.error) {
      // alert(data.error.msg);
      return data.error.msg;
    }
  };
  const onLoginButtonCLicked = async (email: string, pass: string) => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
    const payload: Payload = {
      data: {
        email: email,
        password: pass,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.error) {
      // alert(data.error.msg);
      return data.error.msg;
    }
  };

  const onSubmit = async (data: SignUpSchema & LoginSchema) => {
    const { email, pass, name } = data;
    let errorMessage = null;

    switch (pageMode) {
      case RegistrationPageMode.LOGIN:
        errorMessage = await onLoginButtonCLicked(email, pass);
        break;

      default:
        errorMessage = await onSignUp(name, email, pass);
        break;
    }
    if (!errorMessage) {
      const data = getDataFromLocalStorage(LOCAL_STORAGE_KEYS.OB_PARAMS);
      if (data) await syncObParams(data);
      removeFromLocalStorage(LOCAL_STORAGE_KEYS.OB_PARAMS);
    }
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    await syncUser(directToObIfRequired);

    reset();
  };

  const directToObIfRequired = (user: UserProfile) => {
    if (!user.obParams) {
      router.push("/onboarding");
    } else {
      router.push("/home");
    }
  };

  useEffect(() => {
    const mode = getPageModeFromSearchParams(searchParams);
    setPageMode(mode);
  }, [searchParams]);

  const textMap = {
    [RegistrationPageMode.REGISTER_CTA]: {
      heading: "Let's Sign Up",
      subHeading:
        "Sign up while we craft a perfect reading collection for you.",
      buttonText: "",
    },
    [RegistrationPageMode.LOGIN]: {
      heading: "Let's Log In",
      subHeading: "Sign In uring e-mail",
      buttonText: "Login with Email",
    },
    [RegistrationPageMode.SIGN_UP]: {
      heading: "Let's Sign Up",
      subHeading: "Signing up using e-mail.",
      buttonText: "Sign-Up with Email",
    },
    [RegistrationPageMode.POST_OB]: {
      heading: "",
      subHeading: "",
      buttonText: "",
    },
    [RegistrationPageMode.GETTING_STARTED]: {
      heading: "",
      subHeading: "",
      buttonText: "",
    },
  };

  return (
    <div className="flex flex-col justify-end- h-[100vh] overflow-y-clip">
      <div className="flex flex-col gap-4 h-fit lg:basis-1/2 lg:justify-center lg:rounded-md overflow-clip ">
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
      <div className="flex flex-col flex-grow gap-4 px-6 py-11 pb-5- ">
        <p className="text-[32px] leading-10 font-semibold font-neue-montreal">
          {textMap[pageMode]?.heading}
        </p>
        <p className="text-base font-normal text-gray-500 font-satoshi">
          {textMap[pageMode]?.subHeading}
        </p>
        {[RegistrationPageMode.LOGIN, RegistrationPageMode.SIGN_UP].includes(
          pageMode
        ) && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-grow gap-4 gap-2-"
          >
            {pageMode === RegistrationPageMode.SIGN_UP && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="login-name "
                  className="text-[14px] text-gray-500 font-satoshi font-normal leading-5"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="login-name"
                  {...register("name")}
                  className="box-border p-2 text-gray-900 border-2 rounded-md outline-none appearance-none bg-primary-100 border-primary-100 focus:border-primary-500"
                />
                {
                  <p className="text-red-300 text-[14px] font-satoshi font-medium leading-4 h-[16px]">{`${
                    errors?.name?.message || ""
                  }`}</p>
                }
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="login-email"
                className="text-[14px] text-gray-500 font-satoshi font-normal leading-5"
              >
                E-Mail
              </label>
              <input
                type="email"
                id="login-email"
                {...register("email")}
                className="box-border p-2 text-gray-900 border-2 rounded-md outline-none appearance-none bg-primary-100 border-primary-100 focus:border-primary-500"
              />
              {
                <p className="text-red-300 text-[14px] font-satoshi font-medium leading-4 h-[16px]">{`${
                  errors?.email?.message || ""
                }`}</p>
              }
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="login-pass"
                className="text-[14px] text-gray-500 font-satoshi font-normal leading-5"
              >
                Password
              </label>
              <input
                type="password"
                id="login-pass"
                {...register("pass")}
                className="box-border p-2 text-gray-900 border-2 rounded-md outline-none appearance-none bg-primary-100 border-primary-100 focus:border-primary-500"
              />
              {
                <p className="text-red-300 text-[14px] font-satoshi font-medium leading-4 h-[16px]">{`${
                  errors?.pass?.message || ""
                }`}</p>
              }
              <Link
                href={`/register/?mode=${
                  pageMode === RegistrationPageMode.LOGIN
                    ? RegistrationPageMode.SIGN_UP
                    : RegistrationPageMode.LOGIN
                }`}
              >
                <label className="text-[14px] text-primary-400  font-satoshi font-normal leading-5">
                  {pageMode === RegistrationPageMode.LOGIN
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </label>
              </Link>
            </div>

            <button
              className=" p-2 mt-auto- mt-5 rounded-md bg-primary-500 text-primary-100 py-2.5 font-neue-montreal font-medium text-base"
              type="submit"
              disabled={isSubmitting}
            >
              {textMap[pageMode]?.buttonText}
            </button>
          </form>
        )}
        {pageMode === RegistrationPageMode.REGISTER_CTA && (
          <div className="flex flex-col gap-2 mt- ">
            <Link
              href={`/register/?mode=${RegistrationPageMode.SIGN_UP}`}
              className=" flex justify-center p-2 mt-auto- mt-5 rounded-md bg-primary-500 text-primary-100 py-2.5 font-neue-montreal font-medium text-base"
            >
              <span className="text-base font-medium leading-5 font-neue-montreal">
                Sign-Up with Email
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
