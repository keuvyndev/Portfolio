"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { HeartIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, ScrollTextIcon, XCircleIcon, XIcon, XSquareIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

const Header = () => {

   const { data, status } = useSession();

   const handleSignInClick = () => signIn('google');
   const handleSignOutClick = () => signOut();

   const [showMessage, setShowMessage] = useState(false);


   useEffect(() => {
      if (window.innerWidth > 550) {
         setShowMessage(true);
      }
   }, []);

   return (
      <>
         {showMessage && (
            <div className="bg-primary p-2 text-sm w-full flex justify-center">
               <button onClick={() => setShowMessage(false)} className="flex items-center gap-2 text-center text-white hover:text-red-900">
                  <XCircleIcon size={15} />
                  <span>Para uma experiência otimizada, recomendamos o uso de um smartphone.</span>
               </button>
            </div>
         )}
         <div className="flex justify-between pt-6 px-5">
            <Link href="/">
               <div className="relative h-[30px] w-[100px]">
                  <Image
                     src="/logo.png"
                     alt="FSW Foods"
                     fill
                     sizes="100%"
                     className="object-cover" />
               </div>
            </Link>

            <Sheet>
               <SheetTrigger asChild>
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
                     <Link href="/">
                        <Button
                           variant="ghost"
                           className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                        >
                           <HomeIcon size={16} />
                           <span className="block">Início</span>
                        </Button>
                     </Link>
                  </div>

                  {data?.user && (
                     <>
                        <Button variant="ghost" className="space-x-3 justify-start w-full text-sm font-normal rounded-full" asChild>
                           <Link href="/my-orders">
                              <ScrollTextIcon size={16} />
                              <span className="block">Meus Pedidos</span>
                           </Link>
                        </Button>

                        <Button variant="ghost" className="space-x-3 justify-start w-full text-sm font-normal rounded-full" asChild>
                           <Link href="/my-favorite-restaurant">
                              <HeartIcon size={16} />
                              <span className="block">Restaurantes Favoritos</span>
                           </Link>
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
      </>
   );
}

export default Header;