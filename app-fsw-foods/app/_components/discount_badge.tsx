import { Product } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {

   product: Pick<Product, "discountPercent">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
   return (
      <div className="gap-[2px] bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
         <ArrowDownIcon size={12} />
         <span className="font-semibold text-xs">{product.discountPercent}%</span>
      </div>
   )
}

export default DiscountBadge;