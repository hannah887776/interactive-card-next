
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
  
export const expiryDateSchema = z
  .object({
    month: expiryMonthSchema,
    year: expiryYearSchema,
  })
  .refine(
    ({ month, year }) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      const enteredYear = Number(year);
      const enteredMonth = Number(month);

      return (
        enteredYear > currentYear ||
        (enteredYear === currentYear &&
          enteredMonth >= currentMonth)
      );
    },
    {
      error: "Card has expired",
      path: ["year"],
    },
  );

