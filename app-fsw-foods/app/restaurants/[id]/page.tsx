/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/products-list";
import { db } from "@/app/_lib/prisma";
import { Metadata } from "next";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface RestaurantPageProps {
   params: Promise<{ id: string }>,
}

export const metadata: Metadata = {
   title: `Catálogo do Restaurante - FSW Food`,
}
const RestaurantPage = async ({ params }: RestaurantPageProps): Promise<JSX.Element> => {

   // Aguardar a Promise de 'params' ser resolvida
   const resolvedParams = await params;
   const { id } = resolvedParams;

   // Busca as informações do restaurante, os produtos, e as categorias com seus produtos
   const restaurant = await db.restaurant.findUnique({
      where: {
         id
      },
      include: {
         categories: {
            orderBy: {
               createdAt: 'desc',
            },
            include: {
               products: {
                  where: {
                     restaurantId: id,
                  },
                  include: {
                     restaurant: {
                        select: {
                           name: true,
                        },
                     },
                  },
               },
            },
         },
         products: {
            take: 10,
            include: {
               restaurant: {
                  select: {
                     name: true,
                  },
               },
            },
         },
      },
   }).then((data) => JSON.parse(JSON.stringify(data))); // Retira o warning do "Decimal"

   //console.log(restaurant);

   if (!restaurant) {
      return notFound();
   }

   const session = await getServerSession(authOptions)
   const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
      where: {
         userId: session?.user.id,
      }
   })

   return (
      <div>
         <RestaurantImage restaurant={JSON.parse(JSON.stringify(restaurant))} userFavoriteRestaurants={userFavoriteRestaurants} />

         <div className="flex justify-between items-center px-5 pt-5 relative z-50 py-5 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
            {/* TÍTULO */}
            <div className="flex items-center gap-[0.375rem]">
               <div className="relative h-8 w-8">
                  <Image src={restaurant.imageUrl} alt={restaurant.name} fill sizes="100%" className="rounded-full object-cover" />
               </div>
               <h1 className="font-semibold text-xl">{restaurant.name}</h1>
            </div>
            <div className="bg-foreground h-7 text-white gap-[3px] px-2 py-[2px] rounded-full flex items-center">
               <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
               <span className="font-semibold text-xs">
                  5,0
               </span>
            </div>
         </div>

         {/* INFORMAÇÕES DA ENTREGA */}
         <div className="px-5">
            <DeliveryInfo restaurant={JSON.parse(JSON.stringify(restaurant))} />
         </div>

         <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
            {restaurant.categories.map((category: { id: string, name: string }) => (
               <div key={category.id} className="bg-[#F4F4F4], min-w-[167px] rounded-lg text-center">
                  <span className="text-muted-foreground text-xs">{category.name}</span>
               </div>
            ))}
         </div>

         <div className="mt-6 space-y-4">
            {/* TODO> Mostrar produtos mais pedidos quando implementar realização de pedido */}
            <h2 className="font-semibold">Mais pedidos</h2>
            <ProductList products={restaurant.products} />
         </div>

         {restaurant.categories.map((category: any) => (
            <div className="mt-6 space-y-4" key={category.id}>
               <h2 className="font-semibold">{category.name}</h2>
               <ProductList products={category.products} />
            </div>
         ))}


         <CartBanner restaurant={JSON.parse(JSON.stringify(restaurant))} />

      </div>
   );
}

export default RestaurantPage;