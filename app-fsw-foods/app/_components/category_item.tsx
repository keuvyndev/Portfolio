import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
   category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
   return (
      <>
         <Link href={`/categories/${category.id}/products`}>
            <div className="flex h-14 min-w-fit flex-row items-center justify-start gap-x-3 rounded-full bg-white  px-4 py-3 shadow-md  ">
               <Image
                  src={category.imageUrl}
                  alt={category.name}
                  height={30}
                  width={30}
                  className="max-h-[25px]"
               />
               <span className="font-semibold text-sm mr-5">{category.name}</span>
            </div>
         </Link>
      </>
   );
}

export default CategoryItem;