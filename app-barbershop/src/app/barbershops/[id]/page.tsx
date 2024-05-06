import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopDetailsPageProps {
   params: {
      id?: string;
   };
}

const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {
   
   if(!params.id){
      // TODO: redirecionar para home-page
      return null;
   }
   
   const barbershop = await db.barbershop.findUnique({
      where: {
         id: params.id,
      },
   });

   if(!barbershop){
      // TODO: redirecionar para home-page
      return null;
   }

   return ( 
      <div>
         <div className="h-[250px] w-full relative">
            <Button size="icon" variant="outline" className="z-50 top-4 left-4 absolute">
               <ChevronLeftIcon />
            </Button>
            <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute">
               <MenuIcon />
            </Button>
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
 
export default BarbershopDetailsPage;