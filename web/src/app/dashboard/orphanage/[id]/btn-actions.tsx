"use client";

import { XCircleIcon, CheckIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/button";

import { changeStatusOrphanage } from "@/services/data/change-status-orphanage";

export function Actions() {
  const params = useParams() as { id: string; };

  async function handleChangeStatus(status: "aproved" | "refused") {
    await changeStatusOrphanage({
      id: params.id,
      body: JSON.stringify({
        aproved: status === 'aproved'
      })
    });
  }

  return (
    <footer className="px-20 py-12 overflow-hidden bg-gray-50 flex items-center gap-5 justify-between border-t border-gray-200">
      <Button
        variant="danger"
        onClick={() => handleChangeStatus("refused")}
      >
        <XCircleIcon />
        Recusar
      </Button>
      <Button
        variant="success"
        onClick={() => handleChangeStatus("aproved")}
      >
        <CheckIcon />
        Aceitar
      </Button>
    </footer>
  );
}