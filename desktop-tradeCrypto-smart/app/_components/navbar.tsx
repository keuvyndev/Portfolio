"use client"

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {

   const pathname = usePathname();

   return (
      <nav className="justify-between flex border-b border-solid px-8 py-4">
         {/* ESQUERDA */}
         <div className="flex items-center gap-14">
            <Link href="/"><Image src="/logo.svg" alt="Finance AI" width={173} height={39} /></Link>
            <Link
               href="/"
               className={
                  pathname === "/"
                     ? "text-primary font-bold"
                     : "text-muted-foreground"
               }>Dashboard
            </Link>
            <Link
               href="/transactions"
               className={
                  pathname === "/transactions"
                     ? "text-primary font-bold"
                     : "text-muted-foreground"
               }>Transações
            </Link>
            <Link
               href="/subscription"
               className={
                  pathname === "/subscription"
                     ? "text-primary font-bold"
                     : "text-muted-foreground"
               }>Assinatura
            </Link>
         </div>

         {/* DIREITA */}
         <UserButton showName />
      </nav >
   );
}

export default Navbar;