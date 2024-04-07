import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./input.css";
import Link from "next/link";

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
    <html lang="en">
      <body className={inter.className}>

        <nav>
          <Link href="/">홈</Link>
          <Link href="/article">게시글</Link>
          <Link href="/signup">회원가입</Link>
        </nav>
        {children}</body>
    </html>
  );
}
