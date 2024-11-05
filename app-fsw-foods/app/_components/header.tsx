import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
   return ( 
     <div className="flex justify-between pt-6 px-5">
      <Image src="/logo.png" alt="Logo" height={30} width={100}/>
      <Button size="icon" variant="outline" className="bg-transparent border-none">
         <MenuIcon />
      </Button>
     </div>
   );
}
 
export default Header;