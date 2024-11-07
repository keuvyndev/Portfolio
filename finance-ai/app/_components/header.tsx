"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
   return (
      <div className="items-center justify-between flex h-[72px] border-b-2 border-solid">
         <div className="px-8 gap-8 justify-start flex">
            <Link href="/">
               <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />
            </Link>
            <Link href="/">
               <Button variant={"ghost"} className="text-gray-400 font-semibold hover:bg-background hover:text-primary">Dashboard</Button>
            </Link>
            <Link href="/transactions">
               <Button variant={"ghost"} className="text-gray-400 font-semibold hover:bg-background hover:text-primary">Transações</Button>
            </Link>
            <Link href="/subscription">
               <Button variant={"ghost"} className="text-gray-400 font-semibold hover:bg-background hover:text-primary">Assinatura</Button>
            </Link>
         </div>
         <div className="justify-end mr-5">
            <UserButton showName />
         </div>
      </div >
   );
}

export default Header;