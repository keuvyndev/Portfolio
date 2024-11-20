"use client"

import { Prisma, Product } from "@prisma/client"
import { createContext, ReactNode, useMemo, useState } from "react"
import { calculateProductTotalPrice } from "../_helpers/price";

//A classe foi estendida para obter o valor da quantidade existente no carrinho. O Pay load para obter o deliveryFee.
export interface CartProduct
   extends Prisma.ProductGetPayload<{
      include: {
         restaurant: {
            select: {
               deliveryFee: true,
            }
         }
      }
   }> {
   quantity: number;
}

// Inicializa as variáveis
interface ICartContext {
   products: CartProduct[];
   subTotalPrice: Number,
   totalPrice: Number,
   totalDiscounts: Number,
   addProductToCart: ({ product, quantity, emptyCart, }: {
      product: Prisma.ProductGetPayload<{
         include: {
            restaurant: {
               select: {
                  deliveryFee: true;
               };
            };
         };
      }>;
      quantity: number;
      emptyCart?: boolean;
   }) => void
   decreaseProductQuantity: (productId: string) => void;
   increaseProductQuantity: (productId: string) => void;
   removeProductFromCart: (productId: string) => void;
}

// Define os valores padrão
export const CartContext = createContext<ICartContext>({
   products: [],
   subTotalPrice: 0,
   totalPrice: 0,
   totalDiscounts: 0,
   addProductToCart: () => { },
   decreaseProductQuantity: () => { },
   increaseProductQuantity: () => { },
   removeProductFromCart: () => { },
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [products, setProducts] = useState<CartProduct[]>([]);

   // Retorna o subtotal de todos os produtos da lista.
   const subTotalPrice = useMemo(() => {
      return products.reduce((acc, product) => {
         return acc + Number(product.price) * product.quantity
      }, 0)
   }, [products]);

   // Retorna o total de todos os produtos da lista.
   const totalPrice = useMemo(() => {
      return products.reduce((acc, product) => {
         return acc + calculateProductTotalPrice(product) * product.quantity
      }, 0) + Number(products?.[0]?.restaurant?.deliveryFee);
   }, [products]);

   // Retorna o total de todos os produtos da lista.
   const totalDiscounts = totalPrice - subTotalPrice;

   // Método para adicionar items ao carrinho
   const addProductToCart = ({
      product,
      quantity,
      emptyCart,
   }: {
      product: Prisma.ProductGetPayload<{
         include: {
            restaurant: {
               select: {
                  deliveryFee: true;
               };
            };
         };
      }>;
      quantity: number;
      emptyCart?: boolean;
   }) => {

      // Se o produto for de outro restaurante, limpa a sacola
      if (emptyCart) {
         setProducts([]);
      }

      console.log("Entrou na função")
      // Verificar se o produto está no carrinho
      const isProductAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id);

      // Se estiver no carrinho, percorre os produtos e incrementa a quantidade
      if (isProductAlreadyOnCart) {
         return setProducts((prev) =>
            prev.map((cartProduct) => {
               if (cartProduct.id === product.id) {
                  return {
                     ...cartProduct,
                     quantity: cartProduct.quantity + quantity,
                  };
               }

               return cartProduct;
            })
         );
      }

      // Se não estiver no carrinho, adiciona o novo produto junto a quantidade
      setProducts((prev) => [...prev, { ...product, quantity: quantity }]);

   }

   // Método para decrescer a quantidade do produto
   const decreaseProductQuantity = (productId: string) => {
      return setProducts((prev) =>
         prev.map((cartProduct) => {
            if (cartProduct.id === productId) {
               if (cartProduct.quantity === 1) {
                  return cartProduct;
               }
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity - 1,
               };
            }

            return cartProduct;
         }),
      );
   }

   // Método para acrescentar a quantidade do produto
   const increaseProductQuantity = (productId: string) => {
      return setProducts((prev) =>
         prev.map((cartProduct) => {
            if (cartProduct.id === productId) {
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + 1,
               };
            }

            return cartProduct;
         }),
      );
   }

   // Método para remover o produto da lista.
   const removeProductFromCart = (productId: string) => {
      return setProducts((prev) => prev.filter((product) => product.id !== productId));
   }

   return (
      <CartContext.Provider
         value={{
            subTotalPrice,
            totalDiscounts,
            totalPrice,
            products,
            addProductToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProductFromCart,
         }} >

         {children}
      </ CartContext.Provider >
   )
}
