import Image from "next/image";
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";

export default async function Home() {

  // Chamar o prisma e pegar barbearias
  const barbershops = await db.barbershop.findMany({})
  
  return (


    <div >

      {/* COMPONENTE GLOBAL HEADER */}
      <Header />

      {/* WELCOME */}
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>
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
      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>

      {/* COMPONENTE LOCAL BARBERSHOP-ITEM */}
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>
        
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </div>
  );
}
