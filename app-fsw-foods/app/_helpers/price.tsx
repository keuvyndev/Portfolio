import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
   
   if(product.discountPercent === 0){
      return Number(product.price);
   }

   const discount = Number(product.price) * (product.discountPercent / 100);

   return Number(product.price) - discount;
    
};

export const formatCurrency = (value: number): string => {
   return Intl.NumberFormat("pt-BR", {
      style: "currency",
      minimumFractionDigits: 2,
      currency: "BRL",
   }).format(value);
}