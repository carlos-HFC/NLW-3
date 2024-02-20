import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { cn } from "@/utils";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy",
  description: "Leve felicidade para o mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(nunito.className, "bg-gray-100 text-white h-screen")}>
        {children}
      </body>
    </html>
  );
}
