"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

// Cria um registro na tabela userFavoriteRestaurant
export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const isFavorite = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  // Verifica se o usuário já possui o restaurante como favoritado
  if (isFavorite) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });

    revalidatePath("/");

    return;
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};
