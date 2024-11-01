import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";

interface BarbershopDetailsPageProps {
   params: {
      id?: string;
   };
}

export const metadata: Metadata ={
   title: "Serviços",
   icons:{
     icon: '/icon.png',
     shortcut:'/icon.png',
     apple:'/icon.png',
     other:{
       rel:'/icon.png',
       url:'/icon.png',
     },
   },
 }

const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {

   const session = await getServerSession(authOptions); //Requer authOptions no router.tsx
   
   if(!params.id){
      // TODO: redirecionar para home-page
      return null;
   }
   
   const barbershop = await db.barbershop.findUnique({
      where: {
         id: params.id,
      },

      // Inclui LEFT-JOIN em services
      include: {
         services: true,
      }
   });

   if(!barbershop){
      // TODO: redirecionar para home-page
      return null;
   }

   return ( 
      <div className="px-5 flex flex-col gap-4 py-6">
         <BarbershopInfo barbershop={barbershop} />

         {barbershop.services.map(service => (
            <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!session?.user}/>
         ))}
      </div>
   );
};
 
export default BarbershopDetailsPage;