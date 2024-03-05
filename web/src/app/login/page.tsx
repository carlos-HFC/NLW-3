import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";
import { handleLogin } from "@/services/data/login";

export default function Login() {
  return (
    <div className="h-dvh w-full flex bg-blue-gradient">
      <div className="flex-1 flex justify-center items-center flex-col">
        <Image
          src="/logo-column.svg"
          alt="Logo Happy"
          width="260"
          height="234"
        />

        <div className="text-xl mt-24 flex flex-col leading-8">
          <strong className="font-extrabold">São Paulo</strong>
          <span className="font-semibold">São Paulo</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 w-1/3 relative flex justify-center flex-col">
        <Link
          href="/"
          className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center absolute right-10 top-10"
        >
          <ArrowLeftIcon className="size-6 stroke-blue-500" />
        </Link>

        <form
          className="px-20"
          action={handleLogin}
        >
          <h1 className="font-bold text-3xl text-teal-400 mb-10">Fazer login</h1>

          <FormControl
            label="E-mail"
            name="email"
            type="email"
          />

          <FormControl
            label="Senha"
            name="password"
            type="password"
          />

          <Link
            href="/"
            className="mt-6 font-semibold text-gray-500 flex"
          >
            Esqueci minha senha
          </Link>

          <Button
            type="submit"
            className="mt-11"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}