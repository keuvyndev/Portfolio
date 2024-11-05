import { Metadata } from "next";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category_list";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Delivery de Comida - FSW Food",
}

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <Search />
      </div>

      <div className="px-5 py-6">
        <CategoryList />
      </div>

      <Image 
        src="/promo-banner-01.png" 
        alt="Até 30% de desconto em pizzas!" 
        height={0} 
        width={0} 
        className="w-full h-auto" 
        sizes="100vw" 
        quality={100} 
      />
    </>
  );
}

export default Home;