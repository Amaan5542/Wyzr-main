"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookIcon from "./Icons/BookIcon";
import BookMarkIcon from "./Icons/BookMarkIcon";
import HeadphoneIcon from "./Icons/HeadphoneIcon";
import HomeIcon from "./Icons/HomeIcon";
import { useUserProfileStore } from "@/store/user-profile";

export enum BottomNavPages {
  HOME = "/home",
  LIBRARY = "/library",
  AUDIO_BOOK = "/audio-books",
  ARCHIVE = "/archive",
}
export const AllowedBottomNavePages = [
  BottomNavPages.HOME,
  BottomNavPages.LIBRARY,
  BottomNavPages.AUDIO_BOOK,
  BottomNavPages.ARCHIVE,
] as const;

const BottomNav = () => {
  const pathName = usePathname() as BottomNavPages;
  const showNav = AllowedBottomNavePages.includes(pathName);
  const userName = useUserProfileStore(
    (state) => `${state.profile.firstName} ${state.profile.lastName}`
  );
  return (
    showNav && (
      <div className="fixed inset-x-0 bottom-0 shadow-md border-2 bg-black-50 p-2.5 px-14 bg-white">
        <div className="flex justify-between ">
          <Link href={BottomNavPages.HOME}>
            <HomeIcon
              className={`h-8 w-8 stroke-[2] stroke-primary-500 ${
                pathName === BottomNavPages.HOME ? "opacity-1" : "opacity-50"
              }`}
            />
          </Link>
          <Link href={BottomNavPages.LIBRARY}>
            <BookIcon
              className={`h-8 w-8  stroke-primary-500 ${
                pathName === BottomNavPages.LIBRARY ? "opacity-1" : "opacity-50"
              }`}
            />
          </Link>
          <Link href={BottomNavPages.AUDIO_BOOK}>
            <HeadphoneIcon
              className={`h-8 w-8  stroke-primary-500 ${
                pathName === BottomNavPages.AUDIO_BOOK
                  ? "opacity-1"
                  : "opacity-50"
              }`}
            />
          </Link>
          <Link href={BottomNavPages.ARCHIVE}>
            <BookMarkIcon
              className={`h-8 w-8 stroke-[2] stroke-primary-500 ${
                pathName === BottomNavPages.ARCHIVE ? "opacity-1" : "opacity-50"
              }`}
            />
          </Link>
        </div>
        {/* {userName} */}
      </div>
    )
  );
};
export default BottomNav;
