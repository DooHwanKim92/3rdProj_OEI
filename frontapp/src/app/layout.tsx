import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderSection from "./header/page";
import "./input.css";
import Banner from "./banner/page";
import FooterSection from "./footer/page";

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
      <body className={inter.className}>
        <HeaderSection/>
        <Banner/>
        {children}
        <FooterSection/>
        </body>
    </html>
  );
}
