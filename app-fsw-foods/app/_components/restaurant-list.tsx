import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {

   const restaurants = await db.restaurant.findMany({ take: 10 })
   const session = await getServerSession(authOptions);
   const userFavorites = await db.userFavoriteRestaurant.findMany({
      where: { userId: session?.user?.id },
   })

   return (
      <>
         <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
            {restaurants.map(restaurant =>
               <RestaurantItem
                  key={restaurant.id}
                  restaurant={JSON.parse(JSON.stringify(restaurant))}
                  userFavoriteRestaurants={userFavorites}
               />
            )}
         </div>
      </>
   );
}

export default RestaurantList;