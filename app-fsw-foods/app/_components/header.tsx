"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { HeartIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, ScrollTextIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {

   const { data, status } = useSession();

   const handleSignInClick = () => signIn();
   const handleSignOutClick = () => signOut();

   return (
      <div className="flex justify-between pt-6 px-5">
         <div className="relative h-[30px] w-[100px]">
            <Link href="/">
               <Image src="/logo.png" alt="FSW Foods" fill className="object-cover" />
            </Link>
         </div>

         <Sheet>
            <SheetTrigger>
               <Button
                  size="icon"
                  variant="outline"
                  className="border-none bg-transparent"
               >
                  <MenuIcon />
               </Button>
            </SheetTrigger>
            <SheetContent>
               <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
               </SheetHeader>

               {status === 'authenticated' ? <>
                  <div className="flex justify-between pt-6">
                     <div className="flex items-center gap-3 ">
                        <Avatar>
                           <AvatarImage src={data?.user?.image as string | undefined} />
                           <AvatarFallback>{data?.user?.name?.split(' ')[0][0]}{data?.user?.name?.split(' ')[1][0]}CN</AvatarFallback>
                        </Avatar>

                        <div>
                           <h3 className="font-semibold">{data.user?.name}</h3>
                           <p className="block text-muted-foreground text-xs">
                              {data.user?.email}
                           </p>
                        </div>
                     </div>
                  </div>
               </> : (
                  <>
                     <div className="flex justify-between items-center pt-10">
                        <h2 className="font-semibold"> Olá. Faça seu login! </h2>
                        <Button size="icon" onClick={handleSignInClick}>
                           <LogInIcon />
                        </Button>
                     </div>
                  </>
               )}

               <div className="py-6">
                  <Separator />
               </div>

               <div className="space-y-2">
                  <Button variant="ghost" className="space-x-3 justify-start w-full text-sm font-normal rounded-full">
                     <HomeIcon size={16} />
                     <span className="block">Inicio</span>
                  </Button>
               </div>

               {data?.user && (
                  <>
                     <Button variant="ghost" className="space-x-3 justify-start w-full text-sm font-normal rounded-full">
                        <ScrollTextIcon size={16} />
                        <span className="block">Meus Pedidos</span>
                     </Button>

                     <Button variant="ghost" className="space-x-3 justify-start w-full text-sm font-normal rounded-full">
                        <HeartIcon size={16} />
                        <span className="block">Restaurantes Favoritos</span>
                     </Button>
                  </>
               )}

               <div className="py-6">
                  <Separator />
               </div>

               {data?.user && (
                  <Button onClick={handleSignOutClick} variant="ghost" className="space-x-3 justify-start w-full text-sm font-normal rounded-full">
                     <LogOutIcon size={16} />
                     <span className="block">Sair da conta</span>
                  </Button>
               )}

            </SheetContent>
         </Sheet>
      </div>
   );
}

export default Header;