"use client"

import DiscountBadge from "@/app/_components/discount_badge";
import ProductList from "@/app/_components/products-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma, Product } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

   return (
      <div className="relative z-50 py-5 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
         {/* RESTAURANTE */}
         <div className="flex items-center gap-[0.375rem] px-5">
            <div className="relative h-6 w-6">
               <Image
                  src={product.restaurant.imageUrl}
                  alt={product.restaurant.name}
                  fill
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
         {/* DADOS DA ENTREGA */}
         <div className="px-5">
            <Card className="flex justify-around py-2 mt-6 px-5">

               {/* CUSTO DE ENTREGA */}
               <div className="flex flex-col items-center gap-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                     <span className="text-xs">Entrega</span>
                     <BikeIcon size={14} />
                  </div>

                  {Number(product.restaurant.deliveryFee) > 0 ? (
                     <p className="text-xs font-semibold">{formatCurrency(Number(product.restaurant.deliveryFee))}</p>
                  ) : (
                     <p className="text-xs font-semibold">Grátis</p>
                  )}
               </div>

               {/* TEMPO DE ENTREGA */}
               <div className="flex flex-col items-center gap-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                     <span className="text-xs">Entrega</span>
                     <TimerIcon size={14} />
                  </div>
                  <p className="text-xs font-semibold">{product.restaurant.deliveryTimeMinutes} min</p>
               </div>
            </Card>
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

      </div>
   );
}

export default ProductDetails;