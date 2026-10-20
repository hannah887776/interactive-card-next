

"use client";

import {
  cardholderSchema,
  cardNumberSchema,
  expiryMonthSchema,
  expiryYearSchema,
  expiryDateSchema,
  cvcSchema,
} from "../../validation";

type CardFormProps = {
  cardholder: string;
  onCardholderChange: (value: string) => void;
  cardholderError: string;
  onCardholderErrorChange: (value: string) => void;
  cardholderTouched: boolean;
  onCardholderTouchedChange: (value: boolean) => void;

  cardNumber: string;
  onCardNumberChange: (value: string) => void;
  cardNumberError: string;
  onCardNumberErrorChange: (value: string) => void;
  cardNumberTouched: boolean;
  onCardNumberTouchedChange: (value: boolean) => void;

  expiryMonth: string;
  expiryMonthError: string;
  onExpiryMonthChange: (value: string) => void;
  onExpiryMonthErrorChange: (value: string) => void;

  expiryYear: string;
  expiryYearError: string;
  onExpiryYearChange: (value: string) => void;
  onExpiryYearErrorChange: (value: string) => void;

  cvc: string;
  cvcError: string;
  onCvcChange: (value: string) => void;
  cvcTouched: boolean;
  onCvcTouchedChange: (value: boolean) => void;
  onCvcErrorChange: (value: string) => void;

  onSubmit: () => void;
};

const labelClass =
  "mb-[9px] block whitespace-nowrap text-xs uppercase leading-none tracking-[0.17em] text-ink";

const inputClass =
  "h-[45px] w-full min-w-0 rounded-lg border bg-white px-4 text-lg text-ink outline-none transition-colors placeholder:text-ink/25 hover:border-[#6348fe] focus:border-transparent focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#6348fe,#610595)_border-box]";

export default function CardForm({
  cardholder,
  onCardholderChange,
  cardholderError,
  onCardholderErrorChange,
  cardholderTouched,
  onCardholderTouchedChange,

  cardNumber,
  onCardNumberChange,
  cardNumberError,
  onCardNumberErrorChange,
  cardNumberTouched,
  onCardNumberTouchedChange,

  expiryMonth,
  expiryMonthError,
  onExpiryMonthChange,
  onExpiryMonthErrorChange,

  expiryYear,
  expiryYearError,
  onExpiryYearChange,
  onExpiryYearErrorChange,

  cvc,
  cvcError,
  onCvcChange,
  cvcTouched,
  onCvcTouchedChange,
  onCvcErrorChange,

  onSubmit,
}: CardFormProps) {
  function validateExpiry(month: string, year: string) {
    const monthResult = expiryMonthSchema.safeParse(month);
    const yearResult = expiryYearSchema.safeParse(year);

    onExpiryMonthErrorChange(
      monthResult.success ? "" : monthResult.error.issues[0].message
    );

    onExpiryYearErrorChange(
      yearResult.success ? "" : yearResult.error.issues[0].message
    );

    if (!monthResult.success || !yearResult.success) {
      return;
    }

    const dateResult = expiryDateSchema.safeParse({ month, year });

    if (!dateResult.success) {
      const dateError = dateResult.error.issues[0];

      if (dateError.path[0] === "year") {
        onExpiryYearErrorChange(dateError.message);
      } else {
        onExpiryMonthErrorChange(dateError.message);
      }
    }
  }

  // فقط برای نمایش در فیلد، بعد از هر ۴ رقم فاصله می‌گذاریم.
  const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  

  return (
    <form
      className="flex flex-col gap-[23px] lg:gap-[26px]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label htmlFor="cardholder" className={labelClass}>
          Cardholder name
        </label>

        <input
          id="cardholder"
          name="cardholder"
          type="text"
          value={cardholder}
          onChange={(event) => {
            const value = event.target.value;
            onCardholderChange(value);

            if (cardholderTouched) {
              const result = cardholderSchema.safeParse(value);
              onCardholderErrorChange(
                result.success ? "" : result.error.issues[0].message
              );
            }
          }}
          onBlur={() => {
            onCardholderTouchedChange(true);
            const result = cardholderSchema.safeParse(cardholder);
            onCardholderErrorChange(
              result.success ? "" : result.error.issues[0].message
            );
          }}
          placeholder="e.g. Elham Bahramian"
          className={`${inputClass} ${
            cardholderError ? "border-error" : "border-line"
          }`}
        />

        {cardholderError && (
          <p className="mt-2 text-xs text-error">{cardholderError}</p>
        )}
      </div>

      <div>
        <label htmlFor="cardNumber" className={labelClass}>
          Card number
        </label>

        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          inputMode="numeric"
          maxLength={19}
          value={formattedCardNumber}
          onChange={(event) => {
            const value = event.target.value.replace(/\D/g, "").slice(0, 16);
            onCardNumberChange(value);

            if (cardNumberTouched) {
              const result = cardNumberSchema.safeParse(value);
              onCardNumberErrorChange(
                result.success ? "" : result.error.issues[0].message
              );
            }
          }}
          onBlur={() => {
            onCardNumberTouchedChange(true);
            const result = cardNumberSchema.safeParse(cardNumber);
            onCardNumberErrorChange(
              result.success ? "" : result.error.issues[0].message
            );
          }}
          placeholder="e.g. 1234 5678 9123 0000"
          className={`${inputClass} ${
            cardNumberError ? "border-error" : "border-line"
          }`}
        />

        {cardNumberError && (
          <p className="mt-2 text-xs text-error">{cardNumberError}</p>
        )}
      </div>

      <div className="grid grid-cols-[152px_1fr] gap-[11px] lg:grid-cols-[170px_1fr] lg:gap-5">
        <div>
          <label htmlFor="expiryMonth" className={labelClass}>
            Exp. Date (MM/YY)
          </label>

          <div className="flex gap-2 lg:gap-2.5">
            <input
              id="expiryMonth"
              name="expiryMonth"
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={expiryMonth}
              onChange={(event) => {
                const value = event.target.value;
                onExpiryMonthChange(value);

                if (expiryMonthError) {
                  validateExpiry(value, expiryYear);
                }
              }}
              onBlur={() => validateExpiry(expiryMonth, expiryYear)}
              placeholder="MM"
              aria-label="Expiry month"
              className={`${inputClass} ${
                expiryMonthError ? "border-error" : "border-line"
              }`}
            />
            
            <input
              id="expiryYear"
              name="expiryYear"
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={expiryYear}
              onChange={(event) => {
                const value = event.target.value;
                onExpiryYearChange(value);

                if (expiryYearError || expiryMonthError) {
                  validateExpiry(expiryMonth, value);
                }
              }}
              onBlur={() => validateExpiry(expiryMonth, expiryYear)}
              placeholder="YY"
              aria-label="Expiry year"
              className={`${inputClass} ${
                expiryYearError ? "border-error" : "border-line"
              }`}
            />
          </div>

          {expiryMonthError && (
            <p className="mt-2 text-xs text-error">{expiryMonthError}</p>
          )}

          {expiryYearError && (
            <p className="mt-2 text-xs text-error">{expiryYearError}</p>
          )}
        </div>

        <div>
          <label htmlFor="cvc" className={labelClass}>
            CVC
          </label>

          <input
            id="cvc"
            name="cvc"
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={cvc}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "").slice(0, 3);
              onCvcChange(value);

              if (cvcTouched) {
                const result = cvcSchema.safeParse(value);
                onCvcErrorChange(
                  result.success ? "" : result.error.issues[0].message
                );
              }
            }}
            onBlur={() => {
              onCvcTouchedChange(true);
              const result = cvcSchema.safeParse(cvc);
              onCvcErrorChange(
                result.success ? "" : result.error.issues[0].message
              );
            }}
            placeholder="e.g. 123"
            className={`${inputClass} ${
              cvcError ? "border-error" : "border-line"
            }`}
          />

          {cvcError && (
            <p className="mt-2 text-xs text-error">{cvcError}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-[5px] h-[53px] w-full cursor-pointer rounded-lg bg-ink text-lg text-white transition-opacity hover:opacity-90 lg:mt-[14px]"
      >
        Confirm
      </button>
    </form>
  );
}

