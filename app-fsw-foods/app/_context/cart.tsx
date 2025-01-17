"use client"

import { Prisma } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"
import { calculateProductTotalPrice } from "../_helpers/price";

//A classe foi estendida para obter o valor da quantidade existente no carrinho. O Pay load para obter o deliveryFee.
export interface CartProduct
   extends Prisma.ProductGetPayload<{
      include: {
         restaurant: {
            select: {
               id: true;
               deliveryFee: true;
               deliveryTimeMinutes: true;
            };
         };
      };
   }> {
   quantity: number;
}

// Inicializa as variáveis
interface ICartContext {
   products: CartProduct[];
   subTotalPrice: number;
   totalPrice: number;
   totalDiscounts: number;
   totalQuantity: number;
   addProductToCart: ({
      product,
      emptyCart,
   }: {
      product: CartProduct;
      emptyCart?: boolean;
   }) => void
   decreaseProductQuantity: (productId: string) => void;
   increaseProductQuantity: (productId: string) => void;
   removeProductFromCart: (productId: string) => void;
   clearCart: () => void;
}

// Define os valores padrão
export const CartContext = createContext<ICartContext>({
   products: [],
   subTotalPrice: 0,
   totalPrice: 0,
   totalDiscounts: 0,
   totalQuantity: 0,
   addProductToCart: () => { },
   decreaseProductQuantity: () => { },
   increaseProductQuantity: () => { },
   removeProductFromCart: () => { },
   clearCart: () => { },
})

export const CartProvider = ({ children }: { children: ReactNode }) => {

   const [products, setProducts] = useState<CartProduct[]>([]);

   // Retorna o subtotal de todos os produtos da lista.
   const subTotalPrice = products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
   }, 0);

   // Retorna o total de todos os produtos da lista.
   const totalPrice = products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity
   }, 0) + Number(products?.[0]?.restaurant?.deliveryFee);

   // Retorna o total de todos os produtos da lista.
   const totalQuantity = products.reduce((acc, product) => {
      return acc + product.quantity
   }, 0);

   // Retorna o total de todos os produtos da lista.
   const totalDiscounts = totalPrice - subTotalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

   // Função que limpa o carrinho
   const clearCart = () => {
      return setProducts([]);
   }

   // Método para adicionar items ao carrinho
   const addProductToCart: ICartContext['addProductToCart'] = ({
      product,
      emptyCart,
   }) => {

      // Se o produto for de outro restaurante, limpa a sacola
      if (emptyCart) {
         setProducts([]);
      }

      // Verificar se o produto está no carrinho
      const isProductAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id);

      // Se estiver no carrinho, percorre os produtos e incrementa a quantidade
      if (isProductAlreadyOnCart) {
         return setProducts((prev) =>
            prev.map((cartProduct) => {
               if (cartProduct.id === product.id) {
                  return {
                     ...cartProduct,
                     quantity: cartProduct.quantity + product.quantity,
                  };
               }

               return cartProduct;
            })
         );
      }

      // Se não estiver no carrinho, adiciona o novo produto junto a quantidade
      setProducts((prev) => [...prev, product]);

   }

   // Método para decrescer a quantidade do produto
   const decreaseProductQuantity: ICartContext['decreaseProductQuantity'] = (productId: string) => {
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
   const increaseProductQuantity: ICartContext['increaseProductQuantity'] = (productId: string) => {
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
   const removeProductFromCart: ICartContext['removeProductFromCart'] = (productId: string) => {
      return setProducts((prev) => prev.filter((product) => product.id !== productId));
   }

   return (
      <CartContext.Provider
         value={{
            subTotalPrice,
            totalDiscounts,
            totalPrice,
            totalQuantity,
            products,
            addProductToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProductFromCart,
            clearCart,
         }} >

         {children}
      </ CartContext.Provider >
   )
}
