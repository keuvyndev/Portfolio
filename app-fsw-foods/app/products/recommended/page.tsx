/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const ReccomendedProductsPage = async () => {
   // TODO: Pegar produtos com mais pedidos
   const products = await db.product.findMany({
      where: {
         discountPercent: {
            gt: 0,
         }
      },
      take: 20,
      include: {
         restaurant: {
            select: {
               name: true,
            }
         }
      }
   });
   return (
      <>
         <Header />
         <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-lg">Pedidos Recomendados</h2>
            <div className="grid grid-cols-2 gap-6">
               {products.map((product: any) => (
                  <ProductItem key={product.id} product={product} className="min-w-full" />
               ))}
            </div>
         </div>
      </>
   );
}

export default ReccomendedProductsPage;