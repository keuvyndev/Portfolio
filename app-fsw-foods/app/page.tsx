import { Metadata } from "next";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category_list";

export const metadata: Metadata ={
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
    </>
  );
}
 
export default Home;