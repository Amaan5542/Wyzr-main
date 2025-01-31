import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../public/fonts/satoshi/Fonts/WEB/css/satoshi.css";
import "../styles/globals.css";
import BottomNav from "@/ui/BottonNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wyzr | Learn from India’s top minds.",
  description:
    "Books that help you grow in life and career. Subscribe to join a growing community of readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto bg-gray-100 ">
        <main className="w-[100vw] h-[100vh] overflow-hidden">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
