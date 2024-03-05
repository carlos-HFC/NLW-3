import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="h-full fixed py-8 px-6 bg-blue-gradient flex flex-col justify-between items-center">
      <Image
        src="/map-marker.svg"
        alt="Happy"
        width={64}
        height={72}
      />

      <footer>
        <Link
          className="size-12 border-0 cursor-pointer bg-blue-550 hover:bg-blue-400 rounded-2xl transition-colors flex items-center justify-center"
          href="/map"
        >
          <ArrowLeftIcon className="size-6 stroke-white" />
        </Link>
      </footer>
    </aside>
  );
}