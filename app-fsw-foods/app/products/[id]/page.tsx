import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import { Metadata } from "next";

interface ProductPageProps {
   params: Promise<{
      id: string,
   }>
}

export const metadata: Metadata = {
   title: `Detalhes do Produto - FSW Food`,
}

const ProductsPage = async ({ params }: ProductPageProps) => {

   const { id } = await params;

   // Busca os dados de um único produto no banco
   const product = await db.product.findUnique({
      where: {
         id,
      },
      include: {
         restaurant: true,
      }
   }).then((data) => JSON.parse(JSON.stringify(data))); // Retira o Warning do "Decimal"



   if (!product) {
      return notFound();
   }

   // Busca os dados de todos os sucos
   const juices = await db.product.findMany({
      where: {
         category: {
            name: 'Sucos',
         },
         restaurant: {
            id: product?.restaurantId
         }
      },
      include: {
         restaurant: true,
      }
   }).then((data) => JSON.parse(JSON.stringify(data))); // Retira o Warning do "Decimal"

   return (
      <div>
         <ProductImage product={product} />
         <ProductDetails product={product} complemenataryProcuts={juices} />
      </div>
   );
}

export default ProductsPage;