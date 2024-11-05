import { Metadata } from "next";
import Header from "./_components/header";

export const metadata: Metadata ={
  title: "Delivery de Comida - FSW Food",
}

const Home = () => {
  return ( 
      <Header />
  );
}
 
export default Home;