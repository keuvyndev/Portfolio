import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { memo, useContext } from "react";

interface CartItemProps {
   cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {

   const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } =
      useContext(CartContext);

   const handleDecreaseQuantityClick = () =>
      decreaseProductQuantity(cartProduct.id);

   const handleIncreaseQuantityClick = () =>
      increaseProductQuantity(cartProduct.id);

   const handleRemoveClick = () =>
      removeProductFromCart(cartProduct.id);

   return (
      <div className="flex items-center justify-between">

         <div className="flex items-center gap-4">
            {/* IMAGEM */}
            <div className="w-20 h-20 relative rounded-lg">
               <Image
                  src={cartProduct.imageUrl}
                  alt={cartProduct.name}
                  fill
                  sizes="100%"
                  className="rounded-lg object-cover" />
            </div>

            {/* TEXTO */}
            <div className="space-y-1">

               {/* NOME */}
               <h3 className="text-xs">{cartProduct.name}</h3>

               {/* PREÇO */}
               <div className="flex items-center gap-1">
                  <h4 className="text-sm font-semibold">
                     {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
                  </h4>
                  {cartProduct.discountPercent > 0 && (
                     <span className="text-xs line-through text-muted-foreground">
                        {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
                     </span>
                  )}
               </div>

               {/* QUANTIDADE */}
               <div className="flex items-center text-center">
                  <Button
                     size="icon"
                     variant="ghost"
                     className="border border-solid border-muted-foreground h-7 w-7"
                     onClick={handleDecreaseQuantityClick}
                  >
                     <ChevronLeftIcon size={16} />
                  </Button>
                  <span className="w-8 text-xs block">{cartProduct.quantity}</span>
                  <Button size="icon" className="h-7 w-7" onClick={handleIncreaseQuantityClick} >
                     <ChevronRightIcon size={16} />
                  </Button>
               </div>
            </div>
         </div>

         {/* BOTÃO */}
         <Button size="icon" variant="ghost" className="border border-solid border-muted-foreground h-7 w-7" onClick={handleRemoveClick}>
            <TrashIcon size={16} />
         </Button>
      </div>
   );
};

export default memo(CartItem, (prev, next) => {
   return prev.cartProduct.quantity === next.cartProduct.quantity;
});