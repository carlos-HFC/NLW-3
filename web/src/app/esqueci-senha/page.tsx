"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";

import { forgotPassword } from "@/services/data/forgot-password";

export default function EsqueciSenhaPage() {
  async function handleSendForgotPassword(form: FormData) {
    const response = await forgotPassword(form);

    if (response.statusCode >= 400) {
      return toast.error("Erro ao tentar redefinir a senha", {
        description: "Revise os seus dados e tente novamente"
      });
    }

    toast.success("Redefinição de senha enviada com sucesso");

    await new Promise(exec => setTimeout(exec, 1000));

    redirect("/");
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
        action={handleSendForgotPassword}
      >
        <h1 className="font-bold text-3xl text-teal-400 mb-4">Esqueci a senha</h1>

        <p className="font-semibold text-lg leading-7 text-teal-400 !mb-4">Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

        <FormControl
          label="E-mail"
          name="email"
          type="email"
        />

        <Button type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}