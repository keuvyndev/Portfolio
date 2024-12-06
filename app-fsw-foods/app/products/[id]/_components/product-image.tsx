"use client"

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

interface ProductImageProps {
   product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({ product }: ProductImageProps) => {

   const handleBackClick = () => redirect("/");

   return (
      <>
         <div className="relative w-full h-[360px]">
            <Image
               src={product.imageUrl}
               alt={product.name}
               fill
               sizes="100%"
               className="object-cover"
            />

            <Button
               className="absolute left-4 top-4 bg-white text-foreground rounded-full hover:text-white"
               size="icon"
               onClick={handleBackClick}
            >
               <ChevronLeftIcon />
            </Button>
         </div>
      </>
   );
}

export default ProductImage;