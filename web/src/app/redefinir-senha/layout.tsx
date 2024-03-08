import { Metadata } from "next";

import { RestrictedLayout } from "@/components/restricted-layout";

export const metadata: Metadata = {
  title: "Redefinir senha"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh w-full flex bg-blue-gradient">
      <RestrictedLayout />

      {children}
    </div>
  );
}