"use client";

import { AlertCircleIcon, ArrowLeftIcon, MapPinIcon, PowerIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

import { NavLink } from "./nav-link";

import { logout } from "@/services/data/logout";
import { cn } from "@/utils";

interface SidebarProps {
  pending?: number;
}

export function Sidebar(props: Readonly<SidebarProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const IS_LOGGED = pathname.startsWith("/dashboard");
  const IS_PENDING = searchParams.get("aproved") === 'false';

  async function handleLogout() {
    await logout();
  }

  return (
    <aside className="h-full fixed py-8 px-6 bg-blue-500 flex flex-col justify-between items-center">
      <Image
        src="/map-marker.svg"
        alt="Happy"
        width={48}
        height={56}
      />

      {IS_LOGGED && (
        <nav className="space-y-4">
          <NavLink
            active={!IS_PENDING}
            href="?aproved=true"
            replace
          >
            <MapPinIcon className={cn("size-6", !IS_PENDING ? "stroke-teal-400" : "stroke-white")} />
          </NavLink>
          <NavLink
            active={IS_PENDING}
            href="?aproved=false"
            replace
          >
            {(!IS_PENDING && Boolean(props?.pending)) && (
              <div className="absolute right-2.5 top-2.5 rounded-full size-3 flex justify-center items-center bg-blue-550 group-hover:bg-blue-400">
                <div className="bg-yellow-500 size-2 rounded-full" />
              </div>
            )}
            <AlertCircleIcon className={cn("size-6", IS_PENDING ? "stroke-teal-400" : "stroke-white")} />
          </NavLink>
        </nav>
      )}

      <footer>
        {IS_LOGGED
          ? (
            <button
              className="size-12 border-0 cursor-pointer bg-blue-550 hover:bg-blue-400 rounded-2xl transition-colors flex items-center justify-center"
              onClick={handleLogout}
            >
              <PowerIcon className="size-6 stroke-white" />
            </button>
          ) : (
            <NavLink href="/map">
              <ArrowLeftIcon className="size-6 stroke-white" />
            </NavLink>
          )}
      </footer>
    </aside >
  );
}