import Image from "next/image";

import { Card } from "@/components/card";
import { Confirmation } from "@/components/confirmation";
import { Sidebar } from "@/components/sidebar";

import { listAllOrphanages } from "@/services/data/list-all-orphanages";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    aproved?: string;
    open?: boolean;
    id?: string;
    name?: string;
  };
}

export default async function Dashboard({ searchParams }: PageProps) {
  const { aproved, pending } = await listAllOrphanages();

  const IS_PENDING = searchParams.aproved === 'false';

  const openConfirmation = searchParams.open;
  const orphanageName = searchParams.name;

  const orphaganes = IS_PENDING ? pending : aproved;

  return (
    <div className="flex">
      <Sidebar pending={pending?.length} />

      <main className="flex-1 bg-gray-100">
        <div className="my-16 mx-auto max-w-5xl">
          <header className="flex justify-between items-center pb-6 border-b border-gray-200">
            <h1 className="font-bold text-3xl leading-8 text-teal-500">
              {IS_PENDING
                ? "Cadastrados Pendentes"
                : "Orfanatos Cadastrados"
              }
            </h1>

            {orphaganes?.length > 0 && (
              <p className="font-semibold text-gray-500">
                {orphaganes.length} orfanatos
              </p>
            )}
          </header>

          {orphaganes?.length > 0
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

      <Confirmation
        open={openConfirmation}
        variant="danger"
        title="Excluir!"
        btnText="Excluir orfanato"
        description={<>Você tem certeza que quer <br /> excluir o {orphanageName}?</>}
      />
    </div>
  );
}