import { ComponentProps } from "react";

interface FormControlProps extends ComponentProps<"input"> {
  label: string;
  as?: "input" | "textarea";
  helpText?: string;
}

export function FormControl({ as = "input", ...props }: FormControlProps) {
  return (
    <div className="mt-6 first:mt-0">
      <label
        className="flex text-gray-500 mb-2 leading-6"
        htmlFor={props.id}
      >
        {props.label}
        {props.helpText && (
          <span className="text-sm text-gray-500 ml-6 leading-6">{props.helpText}</span>
        )}
      </label>
      {as === 'textarea'
        ? <textarea
          {...props as ComponentProps<"textarea">}
          className="w-full outline-none rounded-2xl border border-gray-200 bg-gray-50 text-teal-400 min-h-32 max-h-60 resize-y p-4 leading-7"
        />
        : <input
          {...props}
          className="w-full outline-none rounded-2xl border border-gray-200 bg-gray-50 text-teal-400 h-16 py-0 px-4"
        />
      }
    </div>
  );
}