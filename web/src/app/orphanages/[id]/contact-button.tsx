"use client";

import Image from 'next/image';

import { Button } from "@/components/button";

interface ContactButtonProps {
  whatsapp: string;
}

export function ContactButton({ whatsapp }: Readonly<ContactButtonProps>) {
  return (
    <Button
      variant="whatsapp"
      className="mt-16 gap-4"
      onClick={() => window.open(`https://wa.me/${whatsapp}`, "", "width=500,height=500")}
    >
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp Logo"
        width="20"
        height="20"
      />
      Entrar em contato
    </Button>
  );
}