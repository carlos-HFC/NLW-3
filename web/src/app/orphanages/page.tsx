"use client";

import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ZoomControl } from "pigeon-maps";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

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
  name: "",
  about: "",
  instructions: "",
  openingHours: "",
  openOnWeekends: true,
  images: [] as File[]
};

export default function OrphanagesPage() {
  const [anchor, setAnchor] = useState(INITIAL_STATE_ANCHOR);
  const [data, setData] = useState(INITIAL_STATE_FORM);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);

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

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData(prev => {
      if (event.target.name === 'images') {
        if (prev.images.length === 6) return prev;

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
        [event.target.name]: event.target.value
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

    const response = await createOrphanage(form);

    if (response.statusCode === 400) {
      return alert(JSON.stringify(response));
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
          <fieldset className="border-none">
            <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-10 pb-6">Dados</legend>

            <div className="w-full h-[300px] border border-blue-200 rounded-2xl overflow-hidden relative">
              <Map
                height={300}
                zoom={15}
                onClick={handleMapClick}
                boxClassname="w-full flex"
              >
                {anchor.latitude !== 0 && (
                  <Marker anchor={[anchor.latitude, anchor.longitude]} />
                )}
                <ZoomControl />
              </Map>

              {anchor.latitude === 0 && (
                <footer className="py-3 px-0 text-center absolute bottom-0 left-0 bg-blue-50 w-full">
                  <p className="leading-6 text-munsell-500 no-underline font-bold">
                    Clique no mapa para adicionar a localização
                  </p>
                </footer>
              )}
            </div>

            <FormControl
              label="Nome"
              name="name"
              value={data.name}
              onChange={handleChange}
            />

            <FormControl
              label="Sobre"
              name="about"
              as="textarea"
              maxLength={300}
              helpText="Máximo de 300 caracteres"
              value={data.about}
              onChange={handleChange}
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
                  className="w-full h-24 bg-gray-50 border border-dashed border-blue-300 rounded-2xl cursor-pointer flex justify-center items-center aria-disabled:opacity-50 aria-disabled:pointer-events-none"
                  aria-disabled={data.images.length === 6}
                >
                  <PlusIcon className="size-6 stroke-blue-500" />
                </label>

                <input
                  type="file"
                  name="images"
                  id="images"
                  className="hidden"
                  multiple
                  disabled={data.images.length === 6}
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-none mt-20">
            <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-10 pb-6">Visitação</legend>

            <FormControl
              label="Instruções"
              name="instructions"
              as="textarea"
              value={data.instructions}
              onChange={handleChange}
            />

            <FormControl
              label="Horário das visitas"
              name="openingHours"
              value={data.openingHours}
              onChange={handleChange}
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
                    onChange={() => setData(prev => ({ ...prev, openOnWeekends: true }))}
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
                    onChange={() => setData(prev => ({ ...prev, openOnWeekends: false }))}
                  />
                  Não
                </div>
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-16 w-full h-16 border-none cursor-pointer bg-eucalyptus-500 hover:bg-eucalyptus-550 rounded-2xl text-white font-extrabold flex justify-center items-center"
          >
            Confirmar
          </button>
        </form>
      </main>

      {isSuccessRegister && (
        <div className="fixed inset-0 bg-green-500">
          <div className="mx-auto max-w-screen-lg h-dvh flex justify-between items-center gap-28">
            <div className="text-center flex items-center justify-center flex-col max-w-[400px]">
              <h2 className="text-7xl font-extrabold leading-[70px]">
                Ebaaa!
              </h2>
              <p className="font-semibold text-2xl leading-8 mt-8">
                O cadastro deu certo e foi enviado ao administrador para ser aprovado. <br /> Agora é só esperar 🙂
              </p>

              <Link
                href="/map"
                className="bg-green-600 hover:bg-green-400 h-16 flex items-center justify-center rounded-2xl mt-16 px-10 text-white w-max font-extrabold text-lg leading-6"
              >
                Voltar para o mapa
              </Link>
            </div>

            <Image
              src="/register.svg"
              alt=""
              width={400}
              height={290}
            />

          </div>
        </div>
      )}
    </div>
  );
}