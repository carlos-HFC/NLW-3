import Image from "next/image";

export function RestrictedLayout() {
  return (
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
  );
}