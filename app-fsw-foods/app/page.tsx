import { Metadata } from "next";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category_list";
import ProductList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery de Comida - FSW Food",
}

const Home = async () => {

  const products = await db.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      }
    },
    take: 10,
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
      <div className="px-5 py-6">
        <Search />
      </div>

      <div className="px-5 py-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner src="/promo-banner-01.png" alt="Até 30% de desconto em pizzas!" />
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Link href="/products/recommended">
            <Button variant="ghost" className="h-fit p-0 text-primary hover:bg-transparent">
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner src="/promo-banner-02.png" alt="a partir de R$ 17,90 em lanches!" />
      </div>


      <div className="py-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Link href="/restaurants/recommended">
            <Button variant="ghost" className="h-fit p-0 text-primary hover:bg-transparent">
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}

export default Home;