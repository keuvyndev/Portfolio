import { Button } from "@/app/_components/ui/button";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import DiscountBadge from "@/app/_components/discount_badge";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
   params: {
      id: string,
   }
}

const ProductsPage = async ({ params: { id } }: ProductPageProps) => {

   // Busca os dados de um único produto no banco
   const product = await db.product.findUnique({
      where: {
         id,
      },
      include: {
         restaurant: true,
      }
   });

   // Busca os dados de todos os sucos
   const juices = await db.product.findMany({
      where: {
         category: {
            name: 'Sucos',
         },
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
         <ProductDetails product={product} complemenataryProcuts={juices} />
      </div>
   );
}

export default ProductsPage;