"use client"

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/ui/side-menu";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopDetailsPageProps {
   barbershop: Barbershop;
}

const BarbershopInfo = ({barbershop}: BarbershopDetailsPageProps) => {
   
   const router = useRouter();
   const handleBackClick = () => {
      router.replace("/")
   }

   return (
      <div>
         <div className="h-[250px] w-full relative">
            <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 top-4 left-4 absolute">
               <ChevronLeftIcon />
            </Button>

            <Sheet>
               <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute">
                     <MenuIcon />
                  </Button>
               </SheetTrigger>
               
               <SheetContent className="p-0">
                  <SideMenu />
               </SheetContent>
            </Sheet>

            <Image className="opacity-75" alt={barbershop.name} src={barbershop.imageUrl} fill style={{objectFit:"cover",}}/>
         </div>
         <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
            <h1 className="font-bold text-xl">{barbershop.name}</h1>
            <div className="flex item-center gap-1 mt-2">
               <MapPinIcon className="text-primary" size={18}/>
               <p className="text-sm">{barbershop.address}</p>
            </div>
            <div className="flex item-center gap-1 mt-2">
               <StarIcon className="text-primary" size={18}/>
               <p className="text-sm">5,0 (899 Avaliações)</p>
            </div>
         </div>
      </div>
    );
}
 
export default BarbershopInfo;