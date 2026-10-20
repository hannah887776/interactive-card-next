

"use client";

import { useState } from "react";
import CardDisplay from "./components/CardDisplay";
import CardForm from "./components/CardForm";
import {
  cardholderSchema,
  cardNumberSchema,
  expiryMonthSchema,
  expiryYearSchema,
  expiryDateSchema,
  cvcSchema,
} from "../validation";

export default function Home() {
  const [cardholder, setCardholder] = useState("");
  const [cardholderTouched, setCardholderTouched] = useState(false);
  const [cardholderError, setCardholderError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberTouched, setCardNumberTouched] = useState(false);
  const [cardNumberError, setCardNumberError] = useState("");

  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryMonthError, setExpiryMonthError] = useState("");

  const [expiryYear, setExpiryYear] = useState("");
  const [expiryYearError, setExpiryYearError] = useState("");

  const [cvc, setCvc] = useState("");
  const [cvcTouched, setCvcTouched] = useState(false);
  const [cvcError, setCvcError] = useState("");

  const [isComplete, setIsComplete] = useState(false);

  function handleSubmit() {
    setCardholderTouched(true);
    setCardNumberTouched(true);
    setCvcTouched(true);

    const cardholderResult = cardholderSchema.safeParse(cardholder);
    const cardNumberResult = cardNumberSchema.safeParse(cardNumber);
    const expiryMonthResult = expiryMonthSchema.safeParse(expiryMonth);
    const expiryYearResult = expiryYearSchema.safeParse(expiryYear);
    const cvcResult = cvcSchema.safeParse(cvc);

    setCardholderError(
      cardholderResult.success
        ? ""
        : cardholderResult.error.issues[0].message
    );

    setCardNumberError(
      cardNumberResult.success
        ? ""
        : cardNumberResult.error.issues[0].message
    );

    setExpiryMonthError(
      expiryMonthResult.success
        ? ""
        : expiryMonthResult.error.issues[0].message
    );

    setExpiryYearError(
      expiryYearResult.success
        ? ""
        : expiryYearResult.error.issues[0].message
    );

    setCvcError(
      cvcResult.success ? "" : cvcResult.error.issues[0].message
    );

    let expiryDateIsValid = false;

    if (expiryMonthResult.success && expiryYearResult.success) {
      const expiryDateResult = expiryDateSchema.safeParse({
        month: expiryMonth,
        year: expiryYear,
      });

      expiryDateIsValid = expiryDateResult.success;

      if (!expiryDateResult.success) {
        const dateError = expiryDateResult.error.issues[0];

        if (dateError.path[0] === "year") {
          setExpiryYearError(dateError.message);
        } else {
          setExpiryMonthError(dateError.message);
        }
      }
    }

    const formIsValid =
      cardholderResult.success &&
      cardNumberResult.success &&
      expiryMonthResult.success &&
      expiryYearResult.success &&
      expiryDateIsValid &&
      cvcResult.success;

    setIsComplete(formIsValid);
  }

  function handleContinue() {
    setCardholder("");
    setCardholderTouched(false);
    setCardholderError("");

    setCardNumber("");
    setCardNumberTouched(false);
    setCardNumberError("");

    setExpiryMonth("");
    setExpiryMonthError("");

    setExpiryYear("");
    setExpiryYearError("");

    setCvc("");
    setCvcTouched(false);
    setCvcError("");

    setIsComplete(false);
  }

  return (
    <main className="flex min-h-screen flex-col bg-white font-sans lg:flex-row">
      <section
        className="relative h-[240px] shrink-0 lg:h-auto lg:min-h-screen lg:w-[min(33.5vw,483px)]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 25% 18%, rgba(120, 35, 130, 0.65), transparent 70%)," +
            "radial-gradient(ellipse 55% 35% at 95% 0%, rgba(150, 50, 50, 0.55), transparent 70%)," +
            "radial-gradient(ellipse 55% 35% at 0% 62%, rgba(45, 55, 125, 0.85), transparent 70%)," +
            "linear-gradient(160deg, #2a0b3d 0%, #3a1250 30%, #24104a 60%, #21092f 85%)",
        }}
      >
        <CardDisplay
          cardholder={cardholder}
          cardNumber={cardNumber}
          expiryMonth={expiryMonth}
          expiryYear={expiryYear}
          cvc={cvc}
        />
      </section>

      <section className="flex flex-1 items-center justify-center px-6 pb-12 pt-[calc(min(100vw-32px,343px)*0.7318-160px)] lg:justify-start lg:py-16 lg:pl-[min(24.3vw,349px)] lg:pr-12">
        <div className="w-full max-w-[381px]">
          {isComplete ? (
            <div className="flex flex-col items-center text-center">
              <div className="mb-[35px] flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#6348fe] to-[#610595]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 20.5L17 27.5L30.5 13"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h1 className="mb-4 text-[28px] font-medium uppercase tracking-[0.2em] text-ink">
                Thank you!
              </h1>

              <p className="mb-12 text-lg text-[#8e8593]">
                We’ve added your card details
              </p>

              <button
                type="button"
                onClick={handleContinue}
                className="h-[53px] w-full cursor-pointer rounded-lg bg-ink text-lg text-white transition-opacity hover:opacity-90"
              >
                Continue
              </button>
            </div>
          ) : (
            <CardForm
              cardholder={cardholder}
              onCardholderChange={setCardholder}
              cardholderError={cardholderError}
              onCardholderErrorChange={setCardholderError}
              cardholderTouched={cardholderTouched}
              onCardholderTouchedChange={setCardholderTouched}
              cardNumber={cardNumber}
              onCardNumberChange={setCardNumber}
              cardNumberError={cardNumberError}
              onCardNumberErrorChange={setCardNumberError}
              cardNumberTouched={cardNumberTouched}
              onCardNumberTouchedChange={setCardNumberTouched}
              expiryMonth={expiryMonth}
              expiryMonthError={expiryMonthError}
              onExpiryMonthChange={setExpiryMonth}
              onExpiryMonthErrorChange={setExpiryMonthError}
              expiryYear={expiryYear}
              expiryYearError={expiryYearError}
              onExpiryYearChange={setExpiryYear}
              onExpiryYearErrorChange={setExpiryYearError}
              cvc={cvc}
              cvcError={cvcError}
              onCvcChange={setCvc}
              cvcTouched={cvcTouched}
              onCvcTouchedChange={setCvcTouched}
              onCvcErrorChange={setCvcError}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </main>
  );
}
