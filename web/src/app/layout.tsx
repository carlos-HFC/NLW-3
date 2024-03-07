import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/utils";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Happy",
    template: "%s | Happy"
  },
  description: "Leve felicidade para o mundo",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(nunito.className, "bg-gray-100 text-white h-screen")}>
        <Toaster
          richColors
          theme="dark"
        />
        {children}
      </body>
    </html>
  );
}
