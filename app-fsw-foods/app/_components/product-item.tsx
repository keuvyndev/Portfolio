import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProps {
   product: Prisma.ProductGetPayload<{
      include: {
         restaurant: {
            select: {
               name: true,
            }
         }
      }
   }>;
   className?: string
}


const ProductItem = ({ product, className }: ProductItemProps) => {

   return (
      <>
         <Link className={cn("w-[150px] min-w-[150px]", className)} href={`/products/${product.id}`}>
            <div className="w-full space-y-2">
               <div className="aspect-square w-full relative ">
                  <Image
                     src={product.imageUrl}
                     alt={product.name}
                     className="object-cover rounded-lg shadow-md"
                     fill
                     sizes="100%"
                  />

                  {product.discountPercent && (
                     <div className="absolute gap-[2px] top-2 left-2 bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
                        <ArrowDownIcon size={12} />
                        <span className="font-semibold text-xs">{product.discountPercent}%</span>
                     </div>
                  )}
               </div>

               <div>
                  <h2 className="text-sm truncate">{product.name}</h2>
                  <div className="flex gap-1 items-center">
                     <h3 className="font-semibold">
                        {formatCurrency(calculateProductTotalPrice(product))}
                     </h3>
                     {product.discountPercent > 0 && (
                        <span className="line-through text-muted-foreground text-xs">
                           {formatCurrency(Number(product.price))}
                        </span>
                     )}
                  </div>
                  <span className="text-muted-foreground text-xs block">{product.restaurant.name}</span>
               </div>
            </div>
         </Link>
      </>
   );
}

export default ProductItem;