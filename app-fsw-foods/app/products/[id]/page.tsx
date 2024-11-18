import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
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