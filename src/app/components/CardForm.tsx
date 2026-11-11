"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { CardFormValues } from "../../validation";

type CardFormProps = {
  onValidSubmit: (values: CardFormValues) => void;
};

const labelClass =
  "mb-[9px] block whitespace-nowrap text-xs uppercase leading-none tracking-[0.17em] text-ink";

const inputClass =
  "h-[45px] w-full min-w-0 rounded-lg border bg-white px-4 text-lg text-ink outline-none transition-colors placeholder:text-ink/25 hover:border-[#6348fe] focus:border-transparent focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#6348fe,#610595)_border-box]";

function inputClassName(hasError: boolean) {
  return `${inputClass} ${hasError ? "border-error" : "border-line"}`;
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-xs text-error">
      {message}
    </p>
  );
}

// فقط برای نمایش در فیلد، بعد از هر ۴ رقم فاصله می‌گذاریم.
function formatCardNumber(value: string) {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function digitsOnly(value: string, maxLength: number) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

export default function CardForm({ onValidSubmit }: CardFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CardFormValues>();

  return (
    <form
      noValidate
      className="flex flex-col gap-[23px] lg:gap-[26px]"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <div>
        <label htmlFor="cardholder" className={labelClass}>
          Cardholder name
        </label>

        <input
          id="cardholder"
          type="text"
          autoComplete="cc-name"
          placeholder="e.g. Elham Bahramian"
          aria-invalid={!!errors.cardholder}
          aria-describedby={errors.cardholder ? "cardholder-error" : undefined}
          className={inputClassName(!!errors.cardholder)}
          {...register("cardholder")}
        />

        <ErrorMessage id="cardholder-error" message={errors.cardholder?.message} />
      </div>

      <div>
        <label htmlFor="cardNumber" className={labelClass}>
          Card number
        </label>

        <Controller
          name="cardNumber"
          control={control}
          render={({ field: { value, onChange, ...field }, fieldState }) => (
            <input
              {...field}
              id="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength={19}
              value={formatCardNumber(value)}
              onChange={(event) => onChange(digitsOnly(event.target.value, 16))}
              placeholder="e.g. 1234 5678 9123 0000"
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.invalid ? "cardNumber-error" : undefined}
              className={inputClassName(fieldState.invalid)}
            />
          )}
        />

        <ErrorMessage id="cardNumber-error" message={errors.cardNumber?.message} />
      </div>

      <div className="grid grid-cols-[152px_1fr] gap-[11px] lg:grid-cols-[170px_1fr] lg:gap-5">
        <div>
          <label htmlFor="expiryMonth" className={labelClass}>
            Exp. Date (MM/YY)
          </label>

          <div className="flex gap-2 lg:gap-2.5">
            <input
              id="expiryMonth"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp-month"
              maxLength={2}
              placeholder="MM"
              aria-label="Expiry month"
              aria-invalid={!!errors.expiryMonth}
              aria-describedby={errors.expiryMonth ? "expiryMonth-error" : undefined}
              className={inputClassName(!!errors.expiryMonth)}
              {...register("expiryMonth", { deps: "expiryYear" })}
            />

            <input
              id="expiryYear"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp-year"
              maxLength={2}
              placeholder="YY"
              aria-label="Expiry year"
              aria-invalid={!!errors.expiryYear}
              aria-describedby={errors.expiryYear ? "expiryYear-error" : undefined}
              className={inputClassName(!!errors.expiryYear)}
              {...register("expiryYear", { deps: "expiryMonth" })}
            />
          </div>

          <ErrorMessage id="expiryMonth-error" message={errors.expiryMonth?.message} />
          <ErrorMessage id="expiryYear-error" message={errors.expiryYear?.message} />
        </div>

        <div>
          <label htmlFor="cvc" className={labelClass}>
            CVC
          </label>

          <Controller
            name="cvc"
            control={control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <input
                {...field}
                id="cvc"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={3}
                onChange={(event) => onChange(digitsOnly(event.target.value, 3))}
                placeholder="e.g. 123"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? "cvc-error" : undefined}
                className={inputClassName(fieldState.invalid)}
              />
            )}
          />

          <ErrorMessage id="cvc-error" message={errors.cvc?.message} />
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
