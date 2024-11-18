import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
   restaurant: Restaurant,
   className?: string
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
   return (

      <Link className={cn("min-w-[266px] max-w-[266px]", className)} href={`/restaurants/${restaurant.id}`}>
         <div className="w-full space-y-3">

            {/* IMAGEM */}
            <div className="w-full h-[136px] relative">
               <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="object-cover rounded-md"
               />

               <div className="absolute gap-[2px] top-2 left-2 bg-white px-2 py-[2px] rounded-full flex items-center">
                  <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-xs">
                     5,0
                  </span>
               </div>

               <Button
                  size="icon"
                  className="absolute top-2 right-2 bg-gray-700 rounded-full w-7 h-7"
               >
                  <HeartIcon className="h-fit w-fit fill-white" size={16} />
               </Button>
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
      </Link>
   );
};

export default RestaurantItem;