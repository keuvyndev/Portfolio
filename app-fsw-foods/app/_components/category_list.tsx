import { db } from "../_lib/prisma";
import CategoryItem from "./category_item";

const CategoryList = async () => {

   const categories = await db.category.findMany({})
   // Pegar as categorias do banco de dados
   // Renderizar cada item do banco de dados.

   return (
      <>
         <div className="flex flex-row -my-2 gap-3 px-5 py-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {categories.map(category =>
               <>
                  <CategoryItem key={category.id} category={category} />
               </>
            )}
         </div>
      </>
   );
}

export default CategoryList;