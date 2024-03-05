import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fazer login"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}