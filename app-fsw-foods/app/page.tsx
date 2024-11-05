import { Metadata } from "next";
import Header from "./_components/header";
import Search from "./_components/search";

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
    </>
  );
}
 
export default Home;