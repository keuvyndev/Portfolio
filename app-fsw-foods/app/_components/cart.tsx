import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {

   const { products, subTotalPrice, totalPrice, totalDiscounts } = useContext(CartContext);
   //console.log(products)
   return (
      <>
         <div className="py-5">
            <div className="space-y-2">
               {products.map((product) => (
                  <CartItem key={product.id} cartProduct={product} />
               ))}
            </div>

            {/* TOTAIS */}
            <div className="mt-6">
               <Card>
                  <CardContent className="p-5 space-y-2">

                     <div className="justify-between flex items-center text-xs ">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(Number(subTotalPrice))}</span>
                     </div>

                     <Separator />

                     <div className="justify-between flex items-center text-xs ">
                        <span className="text-muted-foreground">Descontos</span>
                        <span>{formatCurrency(Number(totalDiscounts))}</span>
                     </div>

                     <Separator />

                     <div className="justify-between flex items-center text-xs ">
                        <span className="text-muted-foreground">Entrega</span>
                        {Number(products[0].restaurant.deliveryFee) === 0
                           ? <span className="uppercase text-primary">Grátis</span>
                           : <span>formatCurrency(Number(products[0].restaurant.deliveryFee))</span>
                        }
                     </div>

                     <Separator />

                     <div className="justify-between flex items-center text-xs font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(Number(totalPrice))}</span>
                     </div>

                  </CardContent>
               </Card>
            </div>

            {/* FINALIZAR PEDIDO */}
            <Button className="w-full mt-6">Finalizar Pedido</Button>
         </div>
      </>
   );
}

export default Cart;