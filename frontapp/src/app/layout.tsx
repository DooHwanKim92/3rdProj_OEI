import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./input.css";
import Link from "next/link";
import HeaderSection from "./header/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OEI",
  description: "3rd Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <HeaderSection/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
