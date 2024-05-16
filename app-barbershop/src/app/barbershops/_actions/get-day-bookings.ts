"use server";

import { db } from "@/app/_lib/prisma"
import { startOfDay } from "date-fns"
import { endOfDay } from "date-fns/endOfDay";

export const getDayBookings = async (date: Date, barbershopId: string) => {
   
   const bookings = await db.booking.findMany({
      where: {
         barbershopId,
         date: {
            lte: endOfDay(date),
            gte: startOfDay(date)
         }
      }
   })

   return bookings;

};