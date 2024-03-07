"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";
import { Map } from "@/components/map";
import { Marker } from "@/components/marker";

import { editOrphanage } from "@/services/data/edit-orphanage";
import { cn } from "@/utils";

interface FormProps {
  orphanage: Orphanage;
}

interface MapClick {
  event: MouseEvent;
  latLng: [number, number];
  pixel: [number, number];
}

export function Form({ orphanage }: Readonly<FormProps>) {
  const [whatsapp, setWhatsapp] = useState(orphanage.whatsapp.slice(3));
  const [openOnWeekends, setOpenOnWeekends] = useState(String(orphanage.openOnWeekends));
  const [anchor, setAnchor] = useState({
    latitude: Number(orphanage.latitude),
    longitude: Number(orphanage.longitude),
  });

  function handleMapClick(params: MapClick) {
    const [latitude, longitude] = params.latLng;

    setAnchor({
      latitude,
      longitude,
    });
  }

  async function handleSubmit(form: FormData) {
    form.append("latitude", String(anchor.latitude));
    form.append("longitude", String(anchor.longitude));
    form.set("whatsapp", `+55${whatsapp.replaceAll(/[\D]/g, '')}`);

    await editOrphanage({
      id: orphanage.id,
      body: JSON.stringify(Object.fromEntries(form))
    });
  }

  const IS_EDIT = orphanage.aproved;

  return (
    <form
      action={handleSubmit}
      className="px-20 py-16"
      method="POST"
    >
      <fieldset className="border-none space-y-6">
        <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-4 pb-6">Dados</legend>

        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 flex flex-col">
          <Map
            height={280}
            boxClassname="w-full"
            mouseEvents={IS_EDIT}
            touchEvents={IS_EDIT}
            center={[Number(orphanage.latitude), Number(orphanage.longitude)]}
            onClick={handleMapClick}
          >
            <Marker
              anchor={[anchor.latitude, anchor.longitude]}
            />
          </Map>

          <footer className="py-3 px-0 text-center">
            {IS_EDIT
              ? (
                <p className="leading-6 text-munsell-500 no-underline font-bold">
                  Clique no mapa para alterar a localização
                </p>
              ) : (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-6 text-munsell-500 no-underline font-bold"
                >
                  Ver rotas no Google Maps
                </a>
              )}
          </footer>
        </div>

        <FormControl
          label="Nome"
          name="name"
          defaultValue={orphanage.name}
          readOnly={!IS_EDIT}
        />

        <FormControl
          label="Sobre"
          name="about"
          as="textarea"
          defaultValue={orphanage.about}
          readOnly={!IS_EDIT}
        />

        <FormControl
          label="Número de Whatsapp"
          name="whatsapp"
          value={whatsapp.replace(/(\d{2})(\d{5})(\d{4})\d?$/, "($1) $2-$3")}

          onChange={e => setWhatsapp(e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})\d?$/, "($1) $2-$3"))}
          readOnly={!IS_EDIT}
        />

        <div className="mt-6">
          <label className="flex text-gray-500 mb-2 leading-6 font-semibold">
            Fotos
          </label>

          <div className="grid grid-cols-5 gap-4">
            {orphanage.images.map((item) => (
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

      <fieldset className="border-none mt-20 space-y-6">
        <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-4 pb-6">Visitação</legend>

        <FormControl
          label="Instruções"
          name="instructions"
          as="textarea"
          defaultValue={orphanage.instructions}
          readOnly={!IS_EDIT}
        />

        <FormControl
          label="Horário das visitas"
          name="openingHours"
          defaultValue={orphanage.openingHours}
          readOnly={!IS_EDIT}
        />

        <div className="mt-6">
          <label
            className="flex text-gray-500 mb-2 leading-6"
            htmlFor="openOnWeekends"
          >
            Atende fim de semana
          </label>

          <div
            className="grid grid-cols-2 aria-readonly:*:pointer-events-none aria-readonly:*:cursor-auto"
            aria-readonly={!IS_EDIT}
          >
            <div
              aria-readonly={!IS_EDIT}
              className={cn("h-16 flex justify-center items-center relative border cursor-pointer aria-readonly:*:pointer-events-none aria-readonly:*:cursor-auto rounded-l-2xl", openOnWeekends === 'true' ? "bg-green-100 border-green-200 text-green-500" : "border-gray-200 bg-gray-50 text-teal-400 border-r-0")}
            >
              <input
                type="radio"
                name="openOnWeekends"
                className={cn("appearance-none absolute inset-0 cursor-pointer")}
                value="true"
                checked={openOnWeekends === 'true'}
                onChange={(e) => setOpenOnWeekends(e.target.value)}
                readOnly={!IS_EDIT}
              />
              Sim
            </div>
            <div
              aria-readonly={!IS_EDIT}
              className={cn("h-16 flex justify-center items-center relative border cursor-pointer aria-readonly:*:pointer-events-none aria-readonly:*:cursor-auto rounded-r-2xl", openOnWeekends === 'false' ? "bg-red-100 border-red-200 text-red-500" : "border-gray-200 bg-gray-50 text-teal-400 border-l-0")}
            >
              <input
                type="radio"
                name="openOnWeekends"
                className={cn("appearance-none absolute inset-0 cursor-pointer")}
                value="false"
                checked={openOnWeekends === 'false'}
                onChange={(e) => setOpenOnWeekends(e.target.value)}
                readOnly={!IS_EDIT}
              />
              Não
            </div>
          </div>
        </div>
      </fieldset>

      {IS_EDIT && (
        <Button
          type="submit"
          className="mt-16"
        >
          Confirmar
        </Button>
      )}
    </form>
  );
}