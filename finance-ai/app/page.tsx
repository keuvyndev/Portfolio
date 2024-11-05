import { Metadata } from "next";
import { Button } from "./_components/ui/button"

export const metadata: Metadata = {
  title: "Resumo de Finanças - Finance AI",
}

const HomePage = () => {
  return (
    <Button>Hello World!</Button>
  );
}

export default HomePage;