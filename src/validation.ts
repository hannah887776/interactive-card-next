import { z } from "zod";

export const cardholderSchema = z
  .string()
  .trim()
  .min(1, { error: "Can't be blank" })
  .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u, {
    error: "Wrong format, letters only",
  });

export const cardNumberSchema = z
  .string()
  .min(1, { error: "Can't be blank" })
  .regex(/^\d+$/, { error: "Wrong format, numbers only" })
  .length(16, { error: "Card number must be 16 digits" });

export const expiryMonthSchema = z
  .string()
  .min(1, { error: "Can't be blank" })
  .regex(/^(0[1-9]|1[0-2])$/, {
    error: "Invalid month",
  });

export const expiryYearSchema = z
  .string()
  .min(1, { error: "Can't be blank" })
  .regex(/^\d{2}$/, {
    error: "Invalid year",
  });

export const cvcSchema = z
  .string()
  .min(1, { error: "Can't be blank" })
  .regex(/^\d{3}$/, {
    error: "Invalid CVC",
  });

const expiryFieldsSchema = z.object({
  expiryMonth: expiryMonthSchema,
  expiryYear: expiryYearSchema,
});

function isNotExpired({
  expiryMonth,
  expiryYear,
}: {
  expiryMonth: string;
  expiryYear: string;
}) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const enteredYear = Number(expiryYear);
  const enteredMonth = Number(expiryMonth);

  return (
    enteredYear > currentYear ||
    (enteredYear === currentYear && enteredMonth >= currentMonth)
  );
}

export const cardFormSchema = z
  .object({
    cardholder: cardholderSchema,
    cardNumber: cardNumberSchema,
    expiryMonth: expiryMonthSchema,
    expiryYear: expiryYearSchema,
    cvc: cvcSchema,
  })
  .refine(isNotExpired, {
    error: "Card has expired",
    path: ["expiryYear"],
    // Check the date as soon as month and year are valid, even if other fields still have errors.
    when: (payload) => expiryFieldsSchema.safeParse(payload.value).success,
  });

export type CardFormValues = z.infer<typeof cardFormSchema>;

export const emptyCardFormValues: CardFormValues = {
  cardholder: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvc: "",
};
