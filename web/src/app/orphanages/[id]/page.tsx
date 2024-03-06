import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

import { Box } from "@/components/box";
import { Button } from "@/components/button";
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

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { data: { orphanage } } = await api.get<Orphanage, 'orphanage'>(`/orphanages/${params.id}`);

  const images = (await parent).openGraph?.images ?? orphanage.images;

  return {
    title: orphanage.name,
    openGraph: {
      images
    }
  };
}

export async function generateStaticParams() {
  const { data } = await api.get<Orphanage[], 'orphanages'>(`/orphanages`);

  return data.orphanages.map(item => ({
    id: item.id
  }));
}

export default async function OrphanagesDetailPage(props: PageProps) {
  const response = await api.get<Orphanage, 'orphanage'>(`/orphanages/${props.params.id}`);

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
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-6 text-munsell-500 no-underline font-bold"
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
              <Box icon="clock">
                Segunda à sexta <br />
                {orphanage.openingHours}
              </Box>
              {orphanage.openOnWeekends
                ? (
                  <Box icon="info" variant="success">
                    Atendemos <br />
                    fim de semana
                  </Box>
                ) : (
                  <Box icon="info" variant="danger">
                    Não atendemos <br />
                    fim de semana
                  </Box>
                )
              }
            </div>

            <Button
              variant="whatsapp"
              className="mt-16 gap-4"
            >
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp Logo"
                width="20"
                height="20"
              />
              Entrar em contato
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}