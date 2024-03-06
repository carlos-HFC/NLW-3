"use client";

import { ArrowRightIcon, PenLineIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import { Map } from "./map";
import { Marker } from "./marker";

interface CardProps extends Orphanage {
  pending?: boolean;
}

export function Card(props: Readonly<CardProps>) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white flex flex-col">
      <div className="w-full h-[227px] outline outline-1 outline-gray-300 box-content rounded-2xl overflow-hidden relative">
        <Map
          height={227}
          zoom={15}
          center={[Number(props.latitude), Number(props.longitude)]}
          mouseEvents={false}
          touchEvents={false}
        >
          <Marker anchor={[Number(props.latitude), Number(props.longitude)]} />
        </Map>
      </div>

      <footer className="py-4 px-8 flex justify-between items-center">
        <p className="text-teal-400 text-2xl leading-8 font-bold">
          {props.name}
        </p>

        <div className="flex gap-2 items-center">
          {props.pending
            ? (
              <Link
                href={""}
                className="size-12 rounded-2xl bg-gray-100 flex justify-center items-center"
              >
                <ArrowRightIcon className="size-6 stroke-blue-500" />
              </Link>
            ) : (
              <>
                <Link
                  href={""}
                  className="size-12 rounded-2xl bg-gray-100 flex justify-center items-center"
                >
                  <PenLineIcon className="size-6 stroke-blue-500" />
                </Link>
                <button
                  className="size-12 rounded-2xl bg-gray-100 flex justify-center items-center"
                >
                  <TrashIcon className="size-6 stroke-blue-500" />
                </button>
              </>
            )}
        </div>
      </footer>
    </div>
  );
}