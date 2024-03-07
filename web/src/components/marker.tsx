"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Marker as MarkerContainer } from 'pigeon-maps';
import { ComponentProps, useEffect, useState } from "react";

import { cn } from "@/utils";

interface PopupProps extends ComponentProps<typeof MarkerContainer> {
  href?: string;
  payload?: string;
}

export function Marker(props: PopupProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 5000);
    }
  }, [show]);

  return (
    <MarkerContainer
      className={cn("!pointer-events-auto flex justify-center items-center gap-2 w-16", show ? "overflow-visible" : "overflow-hidden")}
      onClick={() => setShow(prev => !prev)}
      {...props}
    >
      <>
        {props.children ?? (
          <Image
            src="/map-marker.svg"
            alt="Map marker"
            width={64}
            height={72}
          />
        )}
        {props.payload && (
          <div
            className={cn("bg-white/80 min-w-60 w-full rounded-2xl text-blue-600 text-lg font-bold flex justify-between items-center gap-2 py-2 px-3 transition-opacity duration-300 absolute left-20", show ? "opacity-100" : "opacity-0")}
            onClick={e => e.stopPropagation()}
          >
            <p className="truncate">
              {props.payload}
            </p>
            <Link
              href={props.href ?? "/"}
              className="size-8 min-w-8 bg-blue-500 rounded-xl flex justify-center items-center"
            >
              <ArrowRightIcon className="size-5 stroke-white" />
            </Link>
          </div>
        )}
      </>
    </MarkerContainer>
  );
};