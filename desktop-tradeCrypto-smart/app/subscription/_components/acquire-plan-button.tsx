"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {

   // Captura os os dados publicos do usuário e verifica se tem assinatura premium
   const { user } = useUser();
   const hasPremiumPlano = user?.publicMetadata.subscriptionPlan == 'premium'
   console.log(`${user?.publicMetadata.subscriptionPlan}`)

   const handleAcquirePlanClick = async () => {

      const { sessionId } = await createStripeCheckout();

      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
         throw new Error("Stripe publishable key not found")
      }

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
         throw new Error("Stripe not found")
      }

      // Redireciona o usuário para o checkout
      await stripe.redirectToCheckout({ sessionId });

   };

   if (hasPremiumPlano) {
      return (
         <Button
            className="w-full rounded-full font-bold"
            variant="link"
         > <Link href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}>Gerenciar plano</Link>
         </Button>
      );
   } else {
      return (
         <Button
            className="w-full rounded-full font-bold"
            onClick={handleAcquirePlanClick}>
            Adiquirir Plano
         </Button>
      );
   }
}

export default AcquirePlanButton;