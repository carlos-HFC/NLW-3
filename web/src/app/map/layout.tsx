import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listagem de orfanatos"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}