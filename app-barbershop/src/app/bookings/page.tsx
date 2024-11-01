import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture } from "date-fns/isFuture";
import { isPast } from "date-fns/isPast";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata ={
   title: "Agendamentos",
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

const BookingsPage = async () => {
   
   // Recuperar sessão do usuário e verificar se ele está logado ou não.
   const session = await getServerSession(authOptions);

   // Caso o usuário não esteja logado, redireciona para a tela inicial.
   if(!session?.user){
       return redirect("/");
   }

   const [confirmedBookings, finishedBookings] = await Promise.all([
      db.booking.findMany({
         where: {
            userId: (session.user as any).id,
            date: {
               gte: new Date(),
            },
         },
         include:{
            service: true,
            barbershop: true,
         },
      }),
      db.booking.findMany({
         where: {
            userId: (session.user as any).id,
            date: {
               lt: new Date(),
            },
         },
         include:{
            service: true,
            barbershop: true,
         },
      }),
   ]);

   return ( 
      <>
         <Header />

         <div className="px-5 py-6">
            <h1 className="text-xl font-bold mb-6">Agendamentos</h1>
            
            {confirmedBookings.length > 0 && (
               <h2 className="text-gray-400 uppercase font-bold text-sm my-6">Confirmados</h2>
            ) }
            <div className="flex flex-col gap-3">
               {confirmedBookings.map( (booking) => (
               <BookingItem key ={booking.id} booking={booking} /> 
            ) )}
            </div>

            {finishedBookings.length > 0 && (
               <h2 className="text-gray-400 uppercase font-bold text-sm my-6 mb-3">Finalizados</h2>
            ) }
            <div className="flex flex-col gap-3">
               {finishedBookings.map( (booking) => (
               <BookingItem key ={booking.id} booking={booking} /> 
            ) )}
            </div>
         </div>
      </>
    );
}
 
export default BookingsPage;