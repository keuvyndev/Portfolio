"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

// Método que retorna agenda no banco que corresponde a uma ID.
export const cancelBooking = async (bookingId: string) => {
   await db.booking.delete({
      where: {
         id: bookingId,
      },
   });

   // Reseta o cache da página e recarrega.
   revalidatePath("/");
   revalidatePath("/bookings");
};