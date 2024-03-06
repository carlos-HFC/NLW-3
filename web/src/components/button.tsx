import { ComponentProps } from "react";

import { cn } from "@/utils";

interface ButtonProps extends ComponentProps<'button'> {
  variant?: "success" | "danger" | "whatsapp";
}

export function Button(props: Readonly<ButtonProps>) {
  let variant = "";

  switch (props.variant) {
    case "danger":
      variant = "bg-red-500";
      break;
    case "whatsapp":
      variant = "bg-eucalyptus-500";
      break;
    case "success":
    default:
      variant = "bg-green-500";
      break;
  }

  return (
    <button
      {...props}
      className={cn(
        "w-full h-16 border-none cursor-pointer rounded-2xl text-white text-lg font-bold flex justify-center items-center gap-4",
        variant,
        props.className
      )}
    />
  );
}