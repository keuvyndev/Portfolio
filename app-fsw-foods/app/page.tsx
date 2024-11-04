import { Metadata } from "next";

export const metadata: Metadata ={
  title: "Delivery de Comida - FSW Food",
}

const Home = () => {
  return ( 
    <div className="bg-red-500 px-10">
      <h1 className="text-3xl">Hello TailWind</h1>
    </div>
  );
}
 
export default Home;