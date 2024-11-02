import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "Barbearias - FSW Barber",
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

export default async function Home() {

  // Chamar o prisma e pegar barbearias
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user ? db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date(), // gte - maior, lt - menor
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }) : Promise.resolve([]),
  ]);

  return (

    <div >

      {/* COMPONENTE GLOBAL HEADER */}
      <Header />

      {/* WELCOME */}
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : 'Olá, vamos agentar um corte hoje?'}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), " EEEE, dd 'de' MMMM", {
          locale: ptBR
        })}</p>
      </div>
        
      {/* COMPONENTE LOCAL SEARCH */}
      <div className="px-5 mt-6 ">
        <Search />
      </div>

      {/* COMPONENTE GLOBAL BOOKING-ITEM */}
      <div className="mt-6">
        
        {confirmedBookings.length > 0 && 
          <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
        }
        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
        </div>
      </div>

      {/* COMPONENTE LOCAL BARBERSHOP-ITEM */}
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados PARA VOCÊ</h2>
        
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id}  className="w-[167px] max-w[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      
      {/* COMPONENTE LOCAL POPULARES */}
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>
        
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.slice().reverse().map((barbershop) => (
            <div key={barbershop.id}  className="w-[167px] max-w[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      {/* MAIS BEM AVALIADOS */}
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">MAIS BEM AVALIADOS</h2>
        
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.slice(4).map((barbershop) => (
            <div key={barbershop.id} className="w-[167px] max-w[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
        ))}
        </div>
        
      </div>

    </div>
  );
}