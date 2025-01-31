// components/Layout.tsx
import { Metadata } from "next";
import React, { ReactNode, Suspense } from "react";

interface RegisterPageLayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "Sign-In to get Wyzr.",
  description:
    "Books that help you grow in life and career. Subscribe to join a growing community of readers.",
};

const Layout: React.FC<RegisterPageLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-[100vw] h-[100vh] overflow-y-scroll overflow-x-clip">
      <div className="border-gray-200 ">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
