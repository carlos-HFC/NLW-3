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

  async function handleDelete() {
    const id = searchParams.get("id");

    if (!id) return;

    const response = await deleteOrphanage({ id });

    if (response?.statusCode === 404) {
      alert("Erro inesperado");
    }

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

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.toggle("overflow-hidden");
  }, [props.open]);

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

          <button
            className={cn(
              "h-16 flex items-center justify-center rounded-2xl mt-16 px-10 text-white w-max font-extrabold text-lg leading-6",
              actionVariant
            )}
            onClick={onClick}
          >
            {props.btnText}
          </button>
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