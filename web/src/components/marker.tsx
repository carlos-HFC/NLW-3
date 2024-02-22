"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Draggable, Marker as MarkerContainer } from 'pigeon-maps';
import { ComponentProps, useEffect, useState } from "react";

import { cn } from "@/utils";

interface PopupProps extends ComponentProps<typeof MarkerContainer> {
  href?: string;
  payload?: string;
  draggable?: boolean;
}

export function Marker(props: PopupProps) {
  const [show, setShow] = useState(false);

  const Popup = props.draggable ? Draggable : MarkerContainer;

  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 5000);
    }
  }, [show]);

  return (
    <Popup
      className="!pointer-events-auto flex justify-center items-center gap-2"
      width={64}
      height={72}
      onClick={() => setShow(prev => !prev)}
      {...props}
    >
      <>
        <Image
          src="/map-marker.svg"
          alt="Map marker"
          width={64}
          height={72}
        />
        {props.payload && (
          <div
            className={cn("bg-white/80 min-w-60 rounded-2xl text-blue-600 text-xl font-bold flex justify-between items-center py-2 px-3 transition-opacity duration-300", show ? "opacity-100" : "opacity-0")}
            onClick={e => e.stopPropagation()}
          >
            {props.payload}
            <Link
              href={props.href ?? "/"}
              className="size-10 bg-blue-500 rounded-xl flex justify-center items-center"
            >
              <ArrowRightIcon className="size-5 stroke-white" />
            </Link>
          </div>
        )}
      </>
    </Popup>
  );
};