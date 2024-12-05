"use client"

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext, useState } from "react";

interface CartBannerProps {
   restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const { products, totalPrice, totalQuantity } = useContext(CartContext);

   const restaurantsHasProductsOnCart = products.filter((product) => product.restaurantId === restaurant.id)
   if (!restaurantsHasProductsOnCart) return null

   return (
      <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3 border-t border-solid border-muted-foreground shadow-md">
         <div className="flex justify-between items-center">
            {/* PREÇO */}
            <div>
               <span className="text-xs text-muted-foreground">Total sem entrega</span>
               <h3 className="font-semibold">{formatCurrency(Number(totalPrice))}
                  <span className="text-xs text-muted-foreground font-regular">
                     {" "} / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}</span>
               </h3>
            </div>
            {/* BOTÃO */}

            <Button onClick={() => setIsCartOpen(true)}>Ver sacola</Button>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
               <SheetContent className="w-[90vw]">
                  <SheetHeader>
                     <SheetTitle>Sacola</SheetTitle>
                  </SheetHeader>

                  <Cart setIsOpen={setIsCartOpen} />
               </SheetContent>
            </Sheet>
         </div>
      </div>
   );
}

export default CartBanner;