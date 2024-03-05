"use client";

import { logout } from "@/services/data/logout";
import { ArrowLeftIcon, PowerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const IS_LOGGED = pathname.startsWith("/dashboard");

  async function handleLogout() {
    await logout();
  }

  return (
    <aside className="h-full fixed py-8 px-6 bg-blue-gradient flex flex-col justify-between items-center">
      <Image
        src="/map-marker.svg"
        alt="Happy"
        width={64}
        height={72}
      />

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
            <Link
              className="size-12 border-0 cursor-pointer bg-blue-550 hover:bg-blue-400 rounded-2xl transition-colors flex items-center justify-center"
              href="/map"
            >
              <ArrowLeftIcon className="size-6 stroke-white" />
            </Link>
          )}
      </footer>
    </aside>
  );
}