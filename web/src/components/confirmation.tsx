"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";

import { cn } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteOrphanage } from "@/services/data/delete-orphanage";

interface ConfirmationProps {
  title: string;
  description: ReactNode;
  btnText: string;
  variant?: "success" | "danger";
  open?: boolean;
}

export function Confirmation(props: Readonly<ConfirmationProps>) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const closeConfirmation = (event: KeyboardEvent) => event.key === 'Escape' && router.replace(pathname);

    document.addEventListener("keydown", closeConfirmation);
    return () => document.removeEventListener("keydown", closeConfirmation);
  });

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.toggle("overflow-hidden");
  }, [props.open]);

  async function handleDelete() {
    const id = searchParams.get("id");

    if (!id) return;

    const response = await deleteOrphanage({ id });

    if (response?.statusCode === 404) {
      alert("Erro inesperado");
    }

    return router.replace(pathname);
  }

  function cancelDelete() {
    return router.replace(pathname);
  }

  let variant = "",
    image = "",
    actionVariant = "",
    onClick: () => void;

  switch (props.variant) {
    case "danger":
      variant = "bg-red-500";
      image = "/delete.svg";
      actionVariant = "bg-red-600 hover:bg-red-600/60";
      onClick = () => handleDelete();
      break;
    case "success":
    default:
      variant = "bg-green-500";
      image = "/register.svg";
      actionVariant = "bg-green-600 hover:bg-green-600/60";
      onClick = () => router.push('/map');
      break;
  }

  return (
    <div
      className={cn(
        "fixed inset-0",
        variant,
        !props.open && 'hidden'
      )}
    >
      <div className="mx-auto max-w-screen-lg h-dvh flex justify-between items-center gap-28">
        <div className="text-center flex items-center justify-center flex-col max-w-[400px]">
          <h2 className="text-7xl font-extrabold leading-[70px]">
            {props.title}
          </h2>
          <p className="font-semibold text-2xl leading-8 mt-8">
            {props.description}
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              className={cn(
                "h-16 flex items-center justify-center rounded-2xl mt-16 px-10 text-white w-max font-extrabold text-lg leading-6",
                actionVariant
              )}
              onClick={onClick}
            >
              {props.btnText}
            </button>

            {props.variant === 'danger' && (
              <button
                className="h-16 flex items-center justify-center rounded-2xl mt-16 px-10 text-white w-max font-extrabold text-lg leading-6 bg-gray-800/60 hover:bg-gray-800/40"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <Image
          src={image}
          alt=""
          width={400}
          height={490}
        />
      </div>
    </div>
  );
}