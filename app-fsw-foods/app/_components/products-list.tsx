import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductListProps {
   products: Prisma.ProductGetPayload<{
      include: {
         restaurant: {
            select: {
               name: true;
            };
         };
      };
   }>[]
}


const ProductList = async ({products}:ProductListProps) => {

   return ( 
      <>
         <div className="flex overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
            {products.map(product =>
               <ProductItem key={product.id} product={product} />
            )}
         </div>
     </>
   );
}
 
export default ProductList;