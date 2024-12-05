"use client"

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurants";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
   restaurant: Restaurant,
   className?: string;
   userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({ restaurant, className, userFavoriteRestaurants }: RestaurantItemProps) => {

   const { data } = useSession();

   const isFavorite = userFavoriteRestaurants.some(
      (fav) => fav.restaurantId === restaurant.id
   )

   const handleFavoriteClick = async () => {

      if (!data?.user.id) return;

      try {
         await toggleFavoriteRestaurant(data?.user.id, restaurant.id)
         toast.success(
            isFavorite
               ? "Restaurante removido dos favoritos."
               : "Restaurante favoritado com sucesso!",
         )
      } catch (error) {
         toast.success("Você já possui este restaurante nos seus favoritos.")
         console.error(error);
      }
   }





   return (

      <div className={cn("min-w-[266px] max-w-[266px]", className)}>
         <div className="w-full space-y-3">

            {/* IMAGEM */}
            <div className="w-full h-[136px] relative">
               <Link href={`/restaurants/${restaurant.id}`}>
                  <Image
                     src={restaurant.imageUrl}
                     alt={restaurant.name}
                     fill
                     className="object-cover rounded-md"
                  />
               </Link>

               <div className="absolute gap-[2px] top-2 left-2 bg-white px-2 py-[2px] rounded-full flex items-center">
                  <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-xs">
                     5,0
                  </span>
               </div>

               {data?.user.id && (
                  <Button
                     size="icon"
                     className={`absolute top-2 right-2 bg-gray-700 rounded-full w-7 h-7 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
                     onClick={handleFavoriteClick}
                  >
                     <HeartIcon className="h-fit w-fit fill-white" size={16} />
                  </Button>
               )}
            </div>

            {/* TEXTO */}
            <div>
               <h3 className="font-semibold text-sm">{restaurant.name}</h3>
               {/* INFORMAÇÕES DA ENTREGA */}
               <div className="flex gap-3">
                  {/* CUSTO DE ENTREGA */}
                  <div className="flex gap-1 items-center">
                     <BikeIcon className="text-primary" size={14} />
                     <span className="text-xs text-muted-foreground">
                        {Number(restaurant.deliveryFee) === 0
                           ? "Entrega grátis"
                           : formatCurrency(Number(restaurant.deliveryFee))}
                     </span>
                  </div>
                  {/* TEMPO DA ENTREGA */}
                  <div className="flex gap-1 items-center">
                     <TimerIcon className="text-primary" size={14} />
                     <span className="text-xs text-muted-foreground">
                        {restaurant.deliveryTimeMinutes} min
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RestaurantItem;