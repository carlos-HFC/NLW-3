import { Sidebar } from "@/components/sidebar";

import { listAllOrphanages } from "@/services/data/list-all-orphanages";

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
            <p className="font-semibold text-gray-500">
              {(IS_PENDING ? pending : aproved).length} orfanatos
            </p>
          </header>
        </div>
      </main>
    </div>
  );
}