// components/Layout.tsx
import { Metadata } from "next";
import React, { ReactNode } from "react";
import BottomNav from "../../ui/BottonNav";

interface HomePageLayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "hello om how are you",
  description: "who is doing",
};

const Layout: React.FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-[100vw] h-[100vh] overflow-y-scroll overflow-x-clip">
      <div className="border-gray-200 ">{children}</div>
    </div>
  );
};

export default Layout;
