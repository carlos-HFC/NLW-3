"use client";

import { ArrowLeftIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";

import { resetPassword } from "@/services/data/reset-password";
import { cn } from "@/utils";

interface PageProps {
  searchParams: {
    email: string;
    token: string;
  };
}

const NUMBERS = /^(?=.*\d)/g;
const UPPER_LETTER = /^(?=.*[A-Z])/g;
const LOWER_LETTER = /^(?=.*[a-z])/g;
const SPECIAL = /^(?=.*\W)/g;

export default function RedefinirSenhaPage({ searchParams }: Readonly<PageProps>) {
  if (
    Object.values(searchParams).some(item => !item.trim()) ||
    !Object.hasOwn(searchParams, 'email') ||
    !Object.hasOwn(searchParams, 'token')
  ) {
    return redirect("/");
  }

  const [password, setPassword] = useState("");

  const passwordValidation = useMemo(() => {
    const obj = {
      number: {
        valid: false,
        text: "A senha deve conter, pelo menos, um número"
      },
      upper: {
        valid: false,
        text: "A senha deve conter, pelo menos, uma letra maiúscula"
      },
      lower: {
        valid: false,
        text: "A senha deve conter, pelo menos, uma letra minúscula"
      },
      special: {
        valid: false,
        text: "A senha deve conter, pelo menos, um caracter especial"
      },
      qty: {
        valid: false,
        text: "A senha deve conter, pelo menos, 8 caracteres"
      },
    };

    if (NUMBERS.test(password)) obj.number.valid = true;
    if (UPPER_LETTER.test(password)) obj.upper.valid = true;
    if (LOWER_LETTER.test(password)) obj.lower.valid = true;
    if (SPECIAL.test(password)) obj.special.valid = true;
    if (password.length >= 8) obj.qty.valid = true;

    return obj;
  }, [password]);

  async function handleResetPassword(form: FormData) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      return toast.error("As senhas não correspondem");
    }

    const response = await resetPassword({
      body: JSON.stringify({ password, confirmPassword }),
      query: new URLSearchParams(searchParams).toString()
    });

    if (response.statusCode === 400) {
      return toast.error("Erro ao alterar senha", {
        description: "Revise os campos e tente novamente"
      });
    }
  }

  return (
    <div className="bg-white border border-gray-200 w-1/3 relative flex justify-center flex-col">
      <Link
        href="/"
        className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center absolute right-10 top-10"
      >
        <ArrowLeftIcon className="size-6 stroke-blue-500" />
      </Link>

      <form
        className="px-20 space-y-6"
        action={handleResetPassword}
      >
        <h1 className="font-bold text-3xl text-teal-400">Redefinição de senha</h1>

        <p className="font-semibold text-lg leading-7 text-teal-400 !mb-4">Escolha uma nova senha para você acessar o dashbaord do Happy.</p>

        <FormControl
          label="Nova senha"
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <FormControl
          label="Repetir senha"
          name="confirmPassword"
          type="password"
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
        />

        <div className="space-y-2">
          {Object.entries(passwordValidation).map(([key, value]) => (
            <span
              key={key}
              className={cn(
                "text-sm font-bold flex gap-2 items-center ml-2 *:size-4",
                !password
                  ? "text-gray-500"
                  : value.valid
                    ? "text-green-500"
                    : "text-red-500"
              )}
            >
              {value.valid
                ? <CheckCircle2Icon />
                : <XCircleIcon />
              }
              {value.text}
            </span>
          ))}
        </div>

        <Button
          type="submit"
          disabled={Object.values(passwordValidation).some(item => !item.valid)}
        >
          Confirmar
        </Button>
      </form>
    </div>
  );
}