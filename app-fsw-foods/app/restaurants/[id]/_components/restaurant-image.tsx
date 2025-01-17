"use client"

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toogle/use-favorite-restaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
   restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
   userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({ restaurant, userFavoriteRestaurants }: RestaurantImageProps) => {

   const { data } = useSession();
   const router = useRouter();
   const isFavorite = isRestaurantFavorited(
      restaurant.id,
      userFavoriteRestaurants,
   );
   const { handleFavoriteClick } = useToggleFavoriteRestaurant({
      restaurantId: restaurant.id,
      userId: data?.user.id,
      restaurantIsFavorited: isFavorite,
   });

   const handleBackClick = () => router.back();

   return (
      <>
         <div className="relative w-full h-[250px]">
            <Image
               src={restaurant.imageUrl}
               alt={restaurant.name}
               fill
               sizes="100%"
               className="object-cover"
            />

            <Button
               className="absolute left-4 top-4 bg-white text-foreground rounded-full hover:text-white"
               size="icon"
               onClick={handleBackClick}
            >
               <ChevronLeftIcon />
            </Button>

            <Button
               size="icon"

               className={`absolute top-4 right-4 bg-gray-700 rounded-full  ${isFavorite && "bg-primary hover:bg-gray-700"}`}
               onClick={handleFavoriteClick}
            >
               <HeartIcon className="h-fit w-fit fill-white" size={20} />
            </Button>
         </div>
      </>
   );
}

export default RestaurantImage;