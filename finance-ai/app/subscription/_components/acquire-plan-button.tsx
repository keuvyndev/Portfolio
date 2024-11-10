"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from '@stripe/stripe-js'

const AcquirePlanButton = () => {

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

   return (
      <Button className="w-full rounded-full font-bold" onClick={handleAcquirePlanClick}> Adquirir Plano </Button>
   );
}

export default AcquirePlanButton;