"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { CardFormValues } from "../../validation";
import CardDisplay from "./CardDisplay";

// Subscribes to the form values so the card updates as the user types,
// without re-rendering the whole page on every keystroke.
export default function LiveCardDisplay() {
  const { control } = useFormContext<CardFormValues>();
  const [cardholder, cardNumber, expiryMonth, expiryYear, cvc] = useWatch({
    control,
    name: ["cardholder", "cardNumber", "expiryMonth", "expiryYear", "cvc"],
  });

  return (
    <CardDisplay
      cardholder={cardholder}
      cardNumber={cardNumber}
      expiryMonth={expiryMonth}
      expiryYear={expiryYear}
      cvc={cvc}
    />
  );
}
