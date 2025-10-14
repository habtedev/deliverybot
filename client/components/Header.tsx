"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="logo-wrapper w-[56px] h-[56px] rounded-xl bg-gradient-to-br from-[#FF8A65] to-[#FF5722] flex items-center justify-center shadow-md animate-logo-pulse">
          <Image src="/vercel.svg" alt="Logo" width={36} height={36} className="invert" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">PhotoBulow</h1>
          <p className="text-sm text-muted-foreground">Order food on Telegram — fast & friendly</p>
        </div>
      </div>

      <nav className="hidden sm:flex gap-3">
        <a className="text-sm px-3 py-2 rounded-md hover:bg-gray-100" href="#how-to-use">How to use</a>
        <a className="text-sm px-3 py-2 rounded-md hover:bg-gray-100" href="#contact">Contact</a>
      </nav>
    </header>
  );
}
