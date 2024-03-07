"use client";

import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { ZoomControl } from "pigeon-maps";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { Confirmation } from "@/components/confirmation";
import { FormControl } from "@/components/form-control";
import { Map } from "@/components/map";
import { Marker } from "@/components/marker";
import { Sidebar } from "@/components/sidebar";

import { createOrphanage } from "@/services/data/create-orphanage";
import { cn } from "@/utils";

interface MapClick {
  event: MouseEvent;
  latLng: [number, number];
  pixel: [number, number];
}

const INITIAL_STATE_ANCHOR = {
  latitude: 0,
  longitude: 0
};

const INITIAL_STATE_FORM = {
  openOnWeekends: true,
  images: [] as File[]
};

export default function OrphanagesPage() {
  const [anchor, setAnchor] = useState(INITIAL_STATE_ANCHOR);
  const [data, setData] = useState(INITIAL_STATE_FORM);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.toggle("overflow-hidden");
  }, [isSuccessRegister]);

  function handleMapClick(params: MapClick) {
    const [latitude, longitude] = params.latLng;

    setAnchor({
      latitude,
      longitude,
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setData(prev => {
      if (event.target.name === 'images') {
        if (prev.images.length === 5) return prev;

        return {
          ...prev,
          images: [
            ...prev.images,
            ...(event.target as HTMLInputElement).files as unknown as File[]
          ]
        };
      }

      return {
        ...prev,
        [event.target.name]: event.target.value === 'true'
      };
    });
  }

  function removeFile(index: number) {
    const newImages = data.images.filter((_, i) => i !== index);

    setData(prev => ({
      ...prev,
      images: newImages
    }));
  }

  async function handleSubmit(form: FormData) {
    form.append("latitude", String(anchor.latitude));
    form.append("longitude", String(anchor.longitude));
    form.set("whatsapp", `+55${whatsapp.replaceAll(/[\D]/g, '')}`);

    const response = await createOrphanage(form);

    if (response.statusCode === 400) {
      return toast.error("Erro ao criar orfanato", {
        description: "Revise os campos e tente novamente"
      });
    }

    setIsSuccessRegister(true);
  }

  const previewImages = useMemo(() => {
    return data.images.length > 0
      ? data.images.map(image => URL.createObjectURL(image))
      : [];
  }, [data.images]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        <form
          action={handleSubmit}
          className="w-[700px] my-16 mx-auto bg-white border border-gray-200 rounded-2xl py-16 px-20 overflow-hidden"
        >
          <fieldset className="border-none space-y-6">
            <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-4 pb-6">Dados</legend>

            <div className="w-full flex flex-col border bg-blue-50 border-blue-200 rounded-2xl overflow-hidden relative">
              <Map
                height={280}
                zoom={15}
                onClick={handleMapClick}
              >
                {anchor.latitude !== 0 && (
                  <Marker anchor={[anchor.latitude, anchor.longitude]} />
                )}
                <ZoomControl />
              </Map>

              {anchor.latitude === 0 && (
                <footer className="py-3 px-0 text-center">
                  <p className="leading-6 text-munsell-500 no-underline font-bold">
                    Clique no mapa para adicionar a localização
                  </p>
                </footer>
              )}
            </div>

            <FormControl
              label="Nome"
              name="name"
            />

            <FormControl
              label="Sobre"
              name="about"
              as="textarea"
              maxLength={300}
              helpText="Máximo de 300 caracteres"
            />

            <FormControl
              label="Número de WhatsApp"
              name="whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})\d?$/, "($1) $2-$3"))}
            />

            <div className="mt-6">
              <label className="flex text-gray-500 mb-2 leading-6">
                Fotos
              </label>

              <div className="grid grid-cols-5 gap-4">
                {previewImages.map((item, index) => (
                  <div
                    key={item}
                    className="relative rounded-2xl overflow-hidden h-24"
                  >
                    <button
                      type="button"
                      className="absolute z-10 bg-white rounded-tr-2xl rounded-bl-2xl size-10 flex justify-center items-center border border-gray-200 right-0"
                      onClick={() => removeFile(index)}
                    >
                      <XIcon className="stroke-red-500" />
                    </button>
                    <Image
                      src={item}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}

                <label
                  htmlFor="images"
                  className={cn("w-full h-24 bg-gray-50 border border-dashed border-blue-300 rounded-2xl cursor-pointer justify-center items-center", data.images.length === 5 ? "hidden" : "flex")}
                >
                  <PlusIcon className="size-6 stroke-blue-500" />
                </label>

                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  hidden
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-none mt-20 space-y-6">
            <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-4 pb-6">Visitação</legend>

            <FormControl
              label="Instruções"
              name="instructions"
              as="textarea"
            />

            <FormControl
              label="Horário das visitas"
              name="openingHours"
            />

            <div className="mt-6">
              <label
                className="flex text-gray-500 mb-2 leading-6"
                htmlFor="openOnWeekends"
              >
                Atende fim de semana
              </label>

              <div className="grid grid-cols-2">
                <div className={cn("h-16 flex justify-center items-center relative border cursor-pointer rounded-l-2xl", data.openOnWeekends ? "bg-green-100 border-green-200 text-green-500" : "border-gray-200 bg-gray-50 text-teal-400 border-r-0")}>
                  <input
                    type="radio"
                    name="openOnWeekends"
                    className={cn("appearance-none absolute inset-0 cursor-pointer")}
                    value="true"
                    checked={data.openOnWeekends}
                    onChange={handleChange}
                  />
                  Sim
                </div>
                <div className={cn("h-16 flex justify-center items-center relative border cursor-pointer rounded-r-2xl", !data.openOnWeekends ? "bg-red-100 border-red-200 text-red-500" : "border-gray-200 bg-gray-50 text-teal-400 border-l-0")}>
                  <input
                    type="radio"
                    name="openOnWeekends"
                    className={cn("appearance-none absolute inset-0 cursor-pointer")}
                    value="false"
                    checked={!data.openOnWeekends}
                    onChange={handleChange}
                  />
                  Não
                </div>
              </div>
            </div>
          </fieldset>

          <Button
            type="submit"
            className="mt-16"
          >
            Confirmar
          </Button>
        </form>
      </main>

      <Confirmation
        open={isSuccessRegister}
        variant="success"
        title="Ebaaa!"
        btnText="Voltar para o mapa"
        description={<>O cadastro deu certo e foi enviado ao administrador para ser aprovado. <br /> Agora é só esperar 🙂</>}
      />
    </div>
  );
}