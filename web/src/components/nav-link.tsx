import Link from "next/link";
import { ComponentProps } from "react";

import { cn } from "@/utils";

interface NavLinkProps extends ComponentProps<typeof Link> {
  active?: boolean;
}

export function NavLink(props: Readonly<NavLinkProps>) {
  return (
    <Link
      {...props}
      className={cn(
        "size-12 border-0 cursor-pointer rounded-2xl transition-colors flex items-center justify-center relative group",
        props.active ? "bg-yellow-500 hover:bg-yellow-400" : "bg-blue-550 hover:bg-blue-400",
        props.className
      )}
    />
  );
}