import { ClockIcon, InfoIcon } from "lucide-react";

import { Gallery } from "@/components/gallery";
import { Map } from "@/components/map";
import { Marker } from "@/components/marker";
import { Sidebar } from "@/components/sidebar";

import { api } from "@/services/api";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function OrphanagesDetailPage(props: PageProps) {
  const response = await api.get<Orphanage>(`/orphanages/${props.params.id}`);

  const { orphanage } = response.data;

  return (
    <div className="flex min-h-dvh">
      <Sidebar />

      <main className="flex-1">
        <div className="w-[700px] my-16 mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <Gallery images={orphanage.images} />

          <div className="p-20">
            <h1 className="text-6xl leading-[54px] mb-2 text-teal-500 font-bold">
              {orphanage.name}
            </h1>
            <p className="text-teal-400 mt-6 leading-7">
              {orphanage.about}
            </p>

            <div className="mt-16 rounded-2xl border border-blue-200 bg-blue-50">
              <Map
                height={280}
                boxClassname="w-full"
                mouseEvents={false}
                touchEvents={false}
                defaultCenter={[Number(orphanage.latitude), Number(orphanage.longitude)]}
                center={[Number(orphanage.latitude), Number(orphanage.longitude)]}
              >
                <Marker
                  anchor={[Number(orphanage.latitude), Number(orphanage.longitude)]}
                />
              </Map>

              <footer className="py-5 px-0 text-center">
                <a
                  href={`https://www.google.com/maps/@${orphanage.latitude},${orphanage.longitude},15z?entry=ttu`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-6 text-munsell-500 no-underline font-semibold"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr className="w-full h-px border-none bg-gray-200 my-16 mx-0" />

            <h2 className="text-4xl leading-[46px] text-teal-500 font-bold">Instruções para visita</h2>
            <p className="text-teal-400 mt-6 leading-7">
              {orphanage.instructions}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-5">
              <div className="py-8 px-6 rounded-2xl leading-7 border border-blue-200 text-teal-400 bg-hour-gradient">
                <ClockIcon className="block mb-5" />
                Segunda à sexta <br />
                {orphanage.openingHours}
              </div>
              {orphanage.openOnWeekends
                ? (
                  <div className="py-8 px-6 rounded-2xl leading-7 border border-green-200 text-green-500 bg-open-weekend-gradient">
                    <InfoIcon className="block mb-5" />
                    Atendemos <br />
                    fim de semana
                  </div>
                ) : (
                  <div className="py-8 px-6 rounded-2xl leading-7 border border-red-200 text-red-500 bg-close-weekend-gradient">
                    <InfoIcon className="block mb-5" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              }
            </div>

            <button>
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}