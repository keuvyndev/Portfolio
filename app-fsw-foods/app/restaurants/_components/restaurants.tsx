"use client"

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

const Restaurants = () => {

   const searchParams = useSearchParams();
   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

   const searchFor = searchParams.get("search");

   // ?
   useEffect(() => {

      const fetchRestaurants = async () => {

         if (!searchFor) {
            return;
         }

         const foundRestaurants = await searchForRestaurants(searchFor);
         setRestaurants(foundRestaurants);
      }

      fetchRestaurants();
   }, [searchParams])

   if (!searchFor) {
      return notFound();
   }

   return (
      <>
         <Header />
         <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-lg">Restaurantes Encontrados</h2>
            <div className="flex flex-col gap-6 w-full">
               {restaurants.map((restaurant) => (
                  <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full" />
               ))}
            </div>
         </div>
      </>
   );
}

export default Restaurants;