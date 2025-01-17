import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const myFavoriteRestaurants = async () => {

   const session = await getServerSession(authOptions)

   if (!session) {
      return notFound();
   }

   const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
      where: {
         userId: session.user.id,
      },
      include: {
         restaurant: true
      }
   })

   return (
      <>
         <Header />
         <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-lg">Restaurantes Favoritos</h2>
            <div className="flex flex-col gap-6 w-full">
               {userFavoriteRestaurants.length > 0 ? (
                  userFavoriteRestaurants.map(({ restaurant }) => (
                     <RestaurantItem
                        key={restaurant.id}
                        restaurant={JSON.parse(JSON.stringify(restaurant))}
                        className="min-w-full max-w-full"
                        userFavoriteRestaurants={userFavoriteRestaurants}
                     />
                  ))) : (
                  <h3 className="font-medium">Você ainda não marcou nenhum restaurante como favorito.</h3>
               )
               }
            </div>
         </div>
      </>
   );
}

export default myFavoriteRestaurants;