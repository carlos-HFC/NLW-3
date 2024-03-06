import { ClockIcon, InfoIcon } from "lucide-react";
import { PropsWithChildren } from "react";

import { cn } from "@/utils";

interface BoxProps extends PropsWithChildren {
  variant?: "success" | "danger";
  icon: "info" | "clock";
}

export function Box(props: Readonly<BoxProps>) {
  let variant = "";

  switch (props.variant) {
    case "danger":
      variant = "border-red-200 text-red-500 bg-close-weekend-gradient";
      break;
    case "success":
      variant = "border-green-200 text-green-500 bg-open-weekend-gradient";
      break;
    default:
      variant = "border-blue-200 text-teal-400 bg-hour-gradient";
      break;
  }

  return (
    <div className={cn("py-8 px-6 rounded-2xl leading-7 border", variant)}>
      {props.icon === 'clock'
        ? <ClockIcon className="block mb-5" />
        : <InfoIcon className="block mb-5" />
      }
      {props.children}
    </div>
  );
}