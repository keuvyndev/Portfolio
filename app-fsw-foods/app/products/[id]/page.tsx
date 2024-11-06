import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";

interface ProductPageProps {
   params: {
      id: string,
   }
}

const ProductsPage = async ({ params: { id } }: ProductPageProps) => {

   const product = await db.product.findUnique({
      where: {
         id,
      },
      include: {
         restaurant: true,
      }
   });

   if (!product) {
      return notFound();
   }

   return (
      <div>

         <ProductImage product={product} />

         {/* TITULO E PREÇO */}
         <div className="p-5">
            {/* RESTAURANTE */}
            <div className="flex items-center gap-[0.375rem]">
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
            <h1 className="font-bold text-xl mb-2 mt-1">{product.name}</h1>

            {/* PREÇO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between">
               {/* PREÇO */}
               <div className="flex items-center">
                  <h2 className="font-semibold text-xl">{formatCurrency(Number(product.price))}</h2>
                  {product.discountPercent > 0 && (
                     <div className="gap-[2px] bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
                        <ArrowDownIcon size={12} />
                        <span className="font-semibold text-xs">{product.discountPercent}%</span>
                     </div>
                  )}
               </div>
            </div>

         </div>
      </div>
   );
}

export default ProductsPage;