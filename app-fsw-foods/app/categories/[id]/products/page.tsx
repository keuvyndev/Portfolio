/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
   title: `Apenas Categoria - FSW Food`,
};

interface CategoriesPageProps {
   params: Promise<{
      id: string;
   }>;
}

const CategoriesPage = async ({ params }: CategoriesPageProps) => {
   const { id } = await params;

   const category = await db.category.findUnique({
      where: {
         id,
      },
      include: {
         products: {
            include: {
               restaurant: {
                  select: {
                     name: true,
                  },
               },
            },
         },
      },
   });

   if (!category) {
      notFound();
   }

   return (
      <>
         <Header />
         <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-lg">{category.name}</h2>
            <div className="grid grid-cols-2 gap-6">
               {category.products.map((product: any) => (
                  <ProductItem
                     key={product.id}
                     product={product}
                     className="min-w-full"
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default CategoriesPage;