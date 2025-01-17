import { Metadata } from "next";
import Header from "./_components/header";
import CategoryList from "./_components/category_list";
import ProductList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Search from "./_components/search";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

export const metadata: Metadata = {
  title: "Delivery de Comida - FSW Food",
}

const fetch = async () => {
  const getProducts = db.product.findMany({
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
    },
    orderBy: {
      categoryId: 'asc',
    },
  });

  const getProductsHamburguer = db.product.findMany({
    where: {
      name: {
        contains: "Burguer",
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        }
      }
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres"
    }
  })

  const getPizzaCategory = db.category.findFirst({
    where: {
      name: "Pizzas"
    }
  })

  const [products, burguerProducts, burguerCategory, pizzaCategory] = await Promise.all([getProducts, getProductsHamburguer, getBurguersCategory, getPizzaCategory])

  return { products, burguerProducts, burguerCategory, pizzaCategory };
}

const Home = async () => {

  const session = await getServerSession(authOptions);

  const { products, burguerProducts, burguerCategory, pizzaCategory } = await fetch();

  return (
    <>
      <Header />
      {
        <div className="px-5 py-6">
          <Search />
        </div>
      }

      <div className="px-5">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${pizzaCategory?.id}/products`}>
          <PromoBanner src="/promo-banner-01.png" alt="Até 30% de desconto em pizzas!" />
        </Link>
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="h-fit p-0 text-primary hover:bg-transparent" asChild>
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${burguerCategory?.id}/products`}>
          <PromoBanner src="/promo-banner-02.png" alt="a partir de R$ 17,90 em lanches!" />
        </Link>
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Mais Pedidos</h2>
          <Button variant="ghost" className="h-fit p-0 text-primary hover:bg-transparent" asChild>
            <Link href={`/categories/${burguerCategory?.id}/products`}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={burguerProducts} />
      </div>

      <div className="py-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button variant="ghost" className="h-fit p-0 text-primary hover:bg-transparent" asChild>
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}

export default Home;