"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ComponentProps, useState } from "react";

import { cn } from "@/utils";

interface FormControlProps extends ComponentProps<"input"> {
  label: string;
  as?: "input" | "textarea";
  helpText?: string;
}

export function FormControl(props: FormControlProps) {
  const [type, setType] = useState(props.type ?? 'text');

  function toggleType() {
    if (type === 'text') return setType('password');
    return setType('text');
  }

  return (
    <div className="font-semibold">
      <label
        className="flex text-gray-500 mb-2 leading-6"
        htmlFor={props.id}
      >
        {props.label}
        {props.helpText && (
          <span className="text-sm text-gray-500 ml-6 leading-6">{props.helpText}</span>
        )}
      </label>

      {props.as === 'textarea'
        ? (
          <textarea
            {...props as ComponentProps<"textarea">}
            className="w-full outline-none rounded-2xl border border-gray-200 bg-gray-50 text-teal-400 min-h-32 max-h-60 resize-y p-4 leading-7"
          />
        ) : (
          <div className="flex relative overflow-hidden rounded-2xl">
            <input
              {...props}
              className={cn("w-full outline-none rounded-2xl border border-gray-200 bg-gray-50 text-teal-400 h-16 py-0 px-4", props.type === 'password' && 'pr-16')}
              type={type}
            />
            {props.type === 'password' && (
              <button
                type="button"
                className="absolute right-0 pl-4 pr-6 h-full flex justify-center items-center *:size-6 *:stroke-gray-500"
                onClick={toggleType}
                tabIndex={-1}
              >
                {type === 'password'
                  ? <EyeIcon />
                  : <EyeOffIcon />
                }
              </button>
            )}
          </div>
        )}
    </div>
  );
}