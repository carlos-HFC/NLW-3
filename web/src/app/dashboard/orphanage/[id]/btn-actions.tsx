"use client";

import { XCircleIcon, CheckIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/button";

import { changeStatusOrphanage } from "@/services/data/change-status-orphanage";

export function Actions() {
  const params = useParams() as { id: string; };

  async function handleChangeStatus(aproved: boolean) {
    await changeStatusOrphanage({
      id: params.id,
      body: JSON.stringify({
        aproved
      })
    });
  }

  return (
    <footer className="px-20 py-12 overflow-hidden bg-gray-50 flex items-center gap-5 justify-between border-t border-gray-200">
      <Button
        type="button"
        variant="danger"
        onClick={() => handleChangeStatus(false)}
      >
        <XCircleIcon />
        Recusar
      </Button>
      <Button
        type="button"
        variant="success"
        onClick={() => handleChangeStatus(true)}
      >
        <CheckIcon />
        Aceitar
      </Button>
    </footer>
  );
}