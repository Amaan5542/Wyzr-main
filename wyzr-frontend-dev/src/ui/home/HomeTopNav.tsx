"use client";
import { useState } from "react";
import BellIcon from "../Icons/BellIcon";
import HamBurgerIcon from "../Icons/HamBurgerIcon";
import SearchIcon from "../Icons/SearchIcon";
import { Transition } from "@headlessui/react";
import { SearchResults } from "./SearchResult";
import { useUserProfileStore } from "@/store/user-profile";

interface UserGreetingProps {
  userName?: string;
}

function UserGreeting({}: UserGreetingProps) {
  const userName = useUserProfileStore(
    (state) => `${state.profile.firstName} ${state.profile.lastName}`
  );
  const updateProfile = useUserProfileStore((state) => state.updateProfile);
  return (
    <div className="flex flex-grow gap-3">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex flex-col justify-center text-md font-satoshi">
        <p className="leading-4">Hello</p>
        {/* <input
          type="text"
          name="sad"
          id="asd"
          value={userName}
          onChange={(e) =>
            updateProfile({
              firstName: e.target.value.split(" ")[0] || "",
              lastName: e.target.value.split(" ")[1] || "",
            })
          }
        /> */}
        <p className="font-bold leading-4">{userName}!</p>
      </div>
    </div>
  );
}

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  handleInputFocus: (focused: boolean) => void;
}

function SearchBar({ query, setQuery, handleInputFocus }: SearchBarProps) {
  return (
    <div className="flex gap-2 px-4 rounded-lg outline-none bg-primary-200/50">
      <SearchIcon className="self-center w-7 h-7 stroke-gray-500 stroke-[1.5]" />
      <input
        type="text"
        // placeholder="Search for your favorite titles..."
        value={query}
        onFocus={() => {
          handleInputFocus(true);
          console.log("focused");
        }}
        // onBlur={() => {
        //   handleInputFocus(false);
        //   setQuery("");

        //   console.log("blurred");
        // }}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 appearance-none focus:outline-none bg-primary-200/10"
      />
    </div>
  );
}

interface HomeTopNavProps {
  userName: string;
}

export function HomeTopNav({ userName }: HomeTopNavProps) {
  const [query, setQuery] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const handleInputFocus = (focused: boolean) => setInputFocused(focused);

  return (
    <div>
      <div
        className={`flex flex-col gap-3 p-5 py-12 bg-primary-100/50 text-primary-400 border border-primary-100 rounded-b-[2rem] transition-height duration-500 ${
          inputFocused ? "h-auto" : "h-auto"
        }`}
      >
        <div className="flex justify-between gap-3">
          <UserGreeting userName={userName} />
          <div className="flex gap-2">
            {!inputFocused && (
              <BellIcon className="stroke-primary-400 stroke-[2] self-center" />
            )}
            {inputFocused && (
              <svg
                onClick={() => {
                  handleInputFocus(false);
                  setQuery("");
                }}
                className="stroke-gray-500 text-lg h-5 w-5 stroke-[2] self-center mx-2"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 17L9 9M9 9L17 1M9 9L1 1M9 9L17 17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {!inputFocused && (
              <HamBurgerIcon className="stroke-primary-400 stroke-[2] self-center" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-normal text-gray-600">
            Search for your favorite titles.
          </p>
          <SearchBar
            query={query}
            setQuery={setQuery}
            handleInputFocus={handleInputFocus}
          />

          {/* Display the query and inputFocused state for debugging */}
          {/* <div>Input Focused: {inputFocused.toString()}</div>
          <div>Query: {query}</div>T */}
        </div>
      </div>
      <SearchResults title={query}></SearchResults>
    </div>
  );
}
