import Image from "next/image";

import { Card } from "@/components/card";
import { Sidebar } from "@/components/sidebar";

import { listAllOrphanages } from "@/services/data/list-all-orphanages";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    aproved?: string;
  };
}

export default async function Dashboard({ searchParams }: PageProps) {
  const { aproved, pending } = await listAllOrphanages();

  const IS_PENDING = searchParams.aproved === 'false';

  const orphaganes = IS_PENDING ? pending : aproved;

  return (
    <div className="flex">
      <Sidebar pending={pending.length} />

      <main className="flex-1 bg-gray-100">
        <div className="my-16 mx-auto max-w-5xl">
          <header className="flex justify-between items-center pb-6 border-b border-gray-200">
            <h1 className="font-bold text-3xl leading-8 text-teal-500">
              {IS_PENDING
                ? "Cadastrados Pendentes"
                : "Orfanatos Cadastrados"
              }
            </h1>

            {orphaganes.length > 0 && (
              <p className="font-semibold text-gray-500">
                {orphaganes.length} orfanatos
              </p>
            )}
          </header>

          {orphaganes.length > 0
            ? (
              <div className="mt-10 grid grid-cols-2 gap-8">
                {orphaganes.map(item => (
                  <Card
                    key={item.id}
                    {...item}
                    pending={IS_PENDING}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <Image
                  src="/logo-gray.svg"
                  width={78}
                  height={88}
                  alt="Logo triste"
                />

                <p className="font-semibold text-2xl leading-8 text-gray-500">Nenhum no momento</p>
              </div>
            )}
        </div>
      </main>

      <div className="fixed inset-0 bg-red-500">
        <div className="mx-auto max-w-screen-lg h-dvh flex justify-between items-center gap-28">
          <div className="text-center flex items-center justify-center flex-col max-w-[400px]">
            <h2 className="text-7xl font-extrabold leading-[70px]">
              Excluir!
            </h2>
            <p className="font-semibold text-2xl leading-8 mt-8">
              Você tem certeza que quer <br /> excluir o Orfanato Esperança?
            </p>

            <Link
              href="/map"
              className="bg-red-600 hover:bg-red-550 h-16 flex items-center justify-center rounded-2xl mt-16 px-10 text-white w-max font-extrabold text-lg leading-6"
            >
              Excluir orfanato
            </Link>
          </div>

          <Image
            src="/delete.svg"
            alt=""
            width={400}
            height={490}
          />
        </div>
      </div>
    </div>
  );
}