import { Metadata } from "next";
import Navbar from "../_components/navbar";

export const metadata: Metadata = {
  title: "Assinatura - Finance AI",
}


const SubscriptionPage = () => {
  return (
    <>
      <Navbar />
      <div className=" p-6 space-y-6">
        <h1>Esta á minha página de assinatura.</h1>
      </div>
    </>
  );
}

export default SubscriptionPage;