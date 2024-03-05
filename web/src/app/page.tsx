import { ArrowRightIcon } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-blue-gradient w-full h-dvh flex justify-center items-center">
      <div className="w-full max-w-screen-lg h-full max-h-[680px] flex items-start flex-col justify-between relative bg-landing bg-no-repeat bg-[80%_center]">
        <div className="flex items-center gap-16">
          <Image
            src="/logo.svg"
            alt="Happy"
            width={240}
            height={74}
          />

          <div className="text-xl flex flex-col leading-8">
            <strong className="font-extrabold">São Paulo</strong>
            <span className="font-semibold">São Paulo</span>
          </div>
        </div>

        <main className="max-w-80">
          <h1 className="text-7xl font-extrabold leading-[70px]">Leve felicidade para o mundo</h1>
          <p className="mt-10 text-2xl leading-8">Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link
          href="/login"
          className="absolute right-0 top-0 bg-blue-400 hover:bg-blue-300 py-3 px-10 flex items-center justify-center rounded-2xl transition-colors duration-200 font-extrabold text-white hover:text-blue-500 text-xl"
        >
          Acesso restrito
        </Link>

        <Link
          href="/map"
          className="absolute right-0 bottom-0 size-20 bg-yellow-500 hover:bg-blue-300 flex items-center justify-center rounded-3xl transition-colors duration-200"
        >
          <ArrowRightIcon className="size-8 text-black/60" />
        </Link>
      </div>
    </div>
  );
}
