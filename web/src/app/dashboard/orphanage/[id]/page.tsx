import { Metadata } from "next";
import Image from "next/image";

import { Actions } from "./btn-actions";

import { FormControl } from "@/components/form-control";
import { Map } from "@/components/map";
import { Marker } from "@/components/marker";
import { Sidebar } from "@/components/sidebar";

import { api } from "@/services/api";
import { cn } from "@/utils";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: { orphanage } } = await api.get<Orphanage, 'orphanage'>(`/orphanages/${params.id}`);

  return {
    title: orphanage.name,
  };
}

export default async function OrphanagesDetailPage(props: PageProps) {
  const response = await api.get<Orphanage, 'orphanage'>(`/orphanages/${props.params.id}`, {
    cache: "no-cache"
  });

  const { orphanage } = response.data;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        <div className="w-[700px] my-16 mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-20 py-16">
            <fieldset className="border-none">
              <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-10 pb-6">Dados</legend>

              <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50">
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

              <FormControl
                label="Nome"
                name="name"
                defaultValue={orphanage.name}
                readOnly
              />

              <FormControl
                label="Sobre"
                name="about"
                as="textarea"
                maxLength={300}
                helpText="Máximo de 300 caracteres"
                defaultValue={orphanage.about}
                readOnly
              />

              <FormControl
                label="Número de Whatsapp"
                name="whatsapp"
                defaultValue={orphanage.whatsapp}
                readOnly
              />

              <div className="mt-6">
                <label className="flex text-gray-500 mb-2 leading-6 font-semibold">
                  Fotos
                </label>

                <div className="grid grid-cols-5 gap-4">
                  {orphanage.images.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl overflow-hidden h-24"
                    >
                      <Image
                        src={item.url}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset className="border-none mt-20">
              <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-10 pb-6">Visitação</legend>

              <FormControl
                label="Instruções"
                name="instructions"
                as="textarea"
                defaultValue={orphanage.instructions}
                readOnly
              />

              <FormControl
                label="Horário das visitas"
                name="openingHours"
                defaultValue={orphanage.openingHours}
                readOnly
              />

              <div className="mt-6">
                <label
                  className="flex text-gray-500 mb-2 leading-6"
                  htmlFor="openOnWeekends"
                >
                  Atende fim de semana
                </label>

                <div className="grid grid-cols-2">
                  <div className={cn("h-16 flex justify-center items-center relative border cursor-pointer rounded-l-2xl", orphanage.openOnWeekends ? "bg-green-100 border-green-200 text-green-500" : "border-gray-200 bg-gray-50 text-teal-400 border-r-0")}>
                    <input
                      type="radio"
                      name="openOnWeekends"
                      className={cn("appearance-none absolute inset-0 cursor-pointer")}
                      defaultChecked={orphanage.openOnWeekends}
                      readOnly
                    />
                    Sim
                  </div>
                  <div className={cn("h-16 flex justify-center items-center relative border cursor-pointer rounded-r-2xl", !orphanage.openOnWeekends ? "bg-red-100 border-red-200 text-red-500" : "border-gray-200 bg-gray-50 text-teal-400 border-l-0")}>
                    <input
                      type="radio"
                      name="openOnWeekends"
                      className={cn("appearance-none absolute inset-0 cursor-pointer")}
                      defaultChecked={!orphanage.openOnWeekends}
                      readOnly
                    />
                    Não
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <Actions />
        </div>
      </main>
    </div>
  );
}