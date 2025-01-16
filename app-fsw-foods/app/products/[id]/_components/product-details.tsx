"use client"

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount_badge";
import ProductList from "@/app/_components/products-list";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
   product: Prisma.ProductGetPayload<{ //GetPayload retorna 1 produto
      include: {
         restaurant: true,
      }
   }>;
   complemenataryProcuts: Prisma.ProductGetPayload<{
      include: {
         restaurant: true
      }
   }>[]; //GetPayload retorna uma LISTA de produtos
}

const ProductDetails = ({ product, complemenataryProcuts }: ProductDetailsProps) => {

   // Itereação do botão de quantidade
   const [quantity, setQuantity] = useState(1);
   const handleIncreaseQuantityClick = () =>
      setQuantity((currentState) => currentState + 1);
   const handleDecreaseQuantityClick = () =>
      setQuantity((currentState) => {
         if (currentState === 1) return 1;
         return currentState - 1;
      });

   // Controla se o Sheet deve estar aberto
   const [isCartOpen, setIsCartOpen] = useState(false);

   // Usando contexto para adição ao carrinho
   const { addProductToCart, products } = useContext(CartContext);
   //console.log(products)

   const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
   const handleAddToCartClick = () => {

      // Verifica se o produto que está sendo adicionado é de outro restaurante
      const hasDifferentRestaurantProduct = products.some(
         (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
      );

      // Se é de outro restaurante sai da função e abre o dialog-alert
      if (hasDifferentRestaurantProduct) {
         return setIsConfirmationDialogOpen(true);
      }

      addToCart({
         emptyCart: false,
      });
   }

   // Adiciona Produto ao carrinho
   const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
      addProductToCart({ product: { ...product, quantity }, emptyCart });
      setIsCartOpen(true);
   }

   return (
      <>
         <div className="relative z-50 py-5 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
            {/* RESTAURANTE */}
            <div className="flex items-center gap-[0.375rem] px-5">
               <div className="relative h-6 w-6">
                  <Image
                     src={product.restaurant.imageUrl}
                     alt={product.restaurant.name}
                     fill
                     sizes="100%"
                     className="rounded-full object-cover"
                  />
               </div>
               <span className="text-xs text-muted-foreground">
                  {product.restaurant.name}
               </span>
            </div>

            {/* NOME DO PRODUTO */}
            <h1 className="font-bold text-xl mb-2 mt-1 px-5">{product.name}</h1>

            {/* PREÇO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between px-5">
               {/* PREÇO COM DESCONTO*/}
               <div>
                  <div className="flex items-center gap-3">
                     <h2 className="font-semibold text-xl">
                        {formatCurrency(calculateProductTotalPrice(product))}
                     </h2>
                     {product.discountPercent > 0 && (
                        <DiscountBadge product={product} />
                     )}
                  </div>

                  {/* PREÇO ORIGINAL */}
                  {product.discountPercent > 0 && ( // Valida se o produto tem desconto
                     <p className="text-sm text-muted-foreground">De: {formatCurrency(Number(product.price))}</p>
                  )}

               </div>

               {/* QUANTIDADE */}
               <div className="flex gap-3 items-center  text-center">
                  <Button onClick={handleDecreaseQuantityClick} variant="ghost" size="icon" className="border border-solid border-muted-foreground">
                     <ChevronLeftIcon />
                  </Button>
                  <span className="w-4">{quantity}</span>
                  <Button onClick={handleIncreaseQuantityClick} size="icon" className="border border-solid border-muted-foreground">
                     <ChevronRightIcon />
                  </Button>
               </div>

            </div>

            {/* INFORMAÇÕES DA ENTREGA */}
            <div className="px-5">
               <DeliveryInfo restaurant={JSON.parse(JSON.stringify(product.restaurant))} />
            </div>

            {/* SOBRE */}
            <div className="mt-6 space-y-3 px-5">
               <h3 className="font-semibold">Sobre</h3>
               <p className="text-muted-foreground text-sm text-justify">{product.description}</p>
            </div>

            {/* SUCOS */}
            <div className="mt-6 space-y-3 px-5">
               <h3 className="font-semibold">Sucos</h3>
               <ProductList products={complemenataryProcuts} />
            </div>

            {/* ADICIONAR */}
            <div className="mt-6 px-5">
               <Button className="w-full font-semibold" onClick={handleAddToCartClick}>Adicionar à sacola</Button>
            </div>

         </div>

         <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-[90vw]">
               <SheetHeader>
                  <SheetTitle>Sacola</SheetTitle>
               </SheetHeader>

               <Cart setIsOpen={setIsCartOpen} />
            </SheetContent>
         </Sheet>

         <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Você só pode adicionar itens de um restaurante por vez</AlertDialogTitle>
                  <AlertDialogDescription>Ao adicionar um item de outro restaurante sua sacola atual será limpada. <b>Deseja mesmo prosseguir?</b></AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>Esvaziar sacola e adicionar</AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}

export default ProductDetails;