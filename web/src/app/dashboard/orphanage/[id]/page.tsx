import { Actions } from "./btn-actions";
import { Form } from "./form";

import { Sidebar } from "@/components/sidebar";

import { getOrphanage } from "@/services/data/get-orphanage";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function OrphanagesDetailPage({ params }: PageProps) {
  const { data: { orphanage } } = await getOrphanage(params.id, {
    cache: "no-cache"
  });

  const IS_EDIT = orphanage.aproved;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        <div className="w-[700px] my-16 mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <Form orphanage={orphanage} />

          {!IS_EDIT && (
            <Actions />
          )}
        </div>
      </main>
    </div>
  );
}