import { PlusIcon } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

import { Map } from "@/components/map";
import { Marker } from "@/components/marker";

import { api } from "@/services/api";

export default async function MapPage() {
  const response = await api.get<Orphanage[], 'orphanages'>("/orphanages", {
    cache: "no-store",
    next: {
      tags: ['orphanages-list'],
    }
  });

  return (
    <div className="w-full h-dvh flex relative">
      <aside className="w-[440px] bg-blue-gradient p-20 flex flex-col justify-between">
        <header>
          <Image
            src="/map-marker.svg"
            alt="Happy"
            width={64}
            height={72}
          />

          <h2 className="font-bold text-4xl mt-16 leading-10">Escolha um orfanato no mapa</h2>
          <p className="leading-6 mt-6">Muitas crianças estão esperando a sua visita 🙂</p>
        </header>

        <footer className="flex flex-col leading-6">
          <strong className="font-extrabold">São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map>
        {response.data.orphanages.map(item => (
          <Marker
            key={item.id}
            payload={item.name}
            href={`/orphanages/${item.id}`}
            anchor={[Number(item.latitude), Number(item.longitude)]}
          />
        ))}
      </Map>

      <Link
        href="/orphanages"
        className="absolute right-10 bottom-10 size-16 rounded-2xl bg-blue-500 hover:bg-blue-400 flex justify-center items-center transition-colors duration-200"
      >
        <PlusIcon />
      </Link>
    </div>
  );
}