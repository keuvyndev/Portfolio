import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

interface CartProps {
   setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {

   const router = useRouter();
   const [isSubmintLoading, setIsSubmitLoading] = useState(false);
   const [isConfirmedDialogOpen, setisConfirmedDialogOpen] = useState(false);

   const { products, subTotalPrice, totalPrice, totalDiscounts, clearCart } = useContext(CartContext);
   //console.log(products)

   const { data, status } = useSession();

   const checkLoginFinish = () => {
      if (status === "authenticated") {
         setisConfirmedDialogOpen(true)
      } else {
         toast.error("É necessário fazer login para finalizar uma compra")
         return signIn('google');
      }
   }

   const handleFinishOrderClick = async () => {

      if (!data?.user) return;

      const restaurant = products[0].restaurant

      try {

         setIsSubmitLoading(true);

         await createOrder({
            subTotalPrice,
            totalDiscounts,
            totalPrice,
            deliveryFee: restaurant.deliveryFee,
            deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
            restaurant: {
               connect: { id: restaurant.id },
            },
            status: OrderStatus.CONFIRMED,
            user: {
               connect: { id: data.user.id },
            },
            products: {
               createMany: {
                  data: products.map((product) => ({
                     productId: product.id,
                     quantity: product.quantity
                  })),
               },
            },
         });

         // Limpa o carrinho após finalizar o pedido
         clearCart();
         setIsOpen(false);
         toast("Pedido finalizado com sucesso!", {
            description: "Você pode acompanhá-lo na tela dos seus pedidos.",
            action: {
               label: "Meus Pedidos",
               onClick: () => router.push(`/my-orders`),
            },
         });

      } catch (error) {
         console.error(error);
      } finally {
         setIsSubmitLoading(false);
      }
   };

   return (
      <>
         <div className="flex h-full flex-col py-5">
            {products.length > 0 ? (
               <>
                  {/* ITENS DA SACOLA */}
                  <div className="space-y-4 flex-auto">
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
                              {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                                 <span className="uppercase text-primary">Grátis</span>
                              ) : (
                                 formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                              )
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
                  <Button
                     className="w-full mt-6"
                     onClick={checkLoginFinish}
                     disabled={isSubmintLoading}
                  >
                     Finalizar Pedido
                  </Button>
               </>
            ) : (
               <h2 className="font-medium text-center">Sua sacola está vazia.</h2>
            )}
         </div >

         <AlertDialog open={isConfirmedDialogOpen} onOpenChange={setisConfirmedDialogOpen}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
                  <AlertDialogDescription>Ao finalizar seu pedido, com os termos e condições da nossa plataforma.</AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFinishOrderClick} disabled={isSubmintLoading}>
                     {isSubmintLoading && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                     )}
                     Finalizar
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}

export default Cart;