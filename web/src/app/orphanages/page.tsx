"use client";

import { PlusIcon } from "lucide-react";
import { Map as MapContainer } from "pigeon-maps";

import { FormControl } from "@/components/form-control";
import { Marker } from "@/components/marker";
import { Sidebar } from "@/components/sidebar";

import { cn } from "@/utils";

export default function OrphanagesPage() {
  const active = true;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        <form className="w-[700px] my-16 mx-auto bg-white border border-gray-200 rounded-2xl py-16 px-20 overflow-hidden">
          <fieldset className="border-none">
            <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-10 pb-6">Dados</legend>

            <MapContainer
              center={[-23.4667111, -46.5923237]}
              height={280}
              zoom={15}
              boxClassname="w-full"
            >
              <Marker
                payload=""
                anchor={[-23.4667111, -46.5923237]}
                draggable
              />
            </MapContainer>

            <FormControl
              label="Nome"
            />

            <FormControl
              label="Sobre"
              as="textarea"
              maxLength={300}
              helpText="Máximo de 300 caracteres"
            />

            <div className="mt-6">
              <label
                className="flex text-gray-500 mb-2 leading-6"
              >
                Fotos
              </label>

              <div />

              <button
                type="button"
                className="w-full h-16 bg-gray-50 border border-dashed border-blue-300 rounded-2xl cursor-pointer flex justify-center items-center"
              >
                <PlusIcon className="size-6 stroke-blue-500" />
              </button>
            </div>
          </fieldset>

          <fieldset className="border-none mt-20">
            <legend className="w-full text-3xl leading-8 text-teal-400 font-bold border-b border-gray-200 mb-10 pb-6">Visitação</legend>

            <FormControl
              label="Instruções"
              as="textarea"
            />

            <FormControl
              label="Opening Hours"
            />

            <div className="mt-6">
              <label
                className="flex text-gray-500 mb-2 leading-6"
              >
                Atende fim de semana
              </label>

              <div className="grid grid-cols-2">
                <button
                  type="button"
                  className={cn("h-16 border cursor-pointer rounded-l-2xl", active ? "bg-green-100 border-green-200 text-green-500" : "border-gray-200 bg-gray-50 text-teal-400")}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={cn("h-16 border cursor-pointer rounded-r-2xl border-l-0", !active ? "bg-green-100 border-green-200 text-green-500" : "border-gray-200 bg-gray-50 text-teal-400")}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}