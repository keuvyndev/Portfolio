"use server"

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

// Efetua agendamento no banco de dados.

interface SaveBookingParams{
   barbershopId: string;
   serviceId: string;
   userId: string;
   date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
   await db.booking.create({
      data: {
         serviceId: params.serviceId,
         userId: params.userId,
         date: params.date,
         barbershopId: params.barbershopId,
      }
   })

   // Reseta o cache da página e recarrega.
   revalidatePath("/");
   revalidatePath("/bookings");
}