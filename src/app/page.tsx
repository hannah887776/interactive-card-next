"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardForm from "./components/CardForm";
import LiveCardDisplay from "./components/LiveCardDisplay";
import {
  cardFormSchema,
  emptyCardFormValues,
  type CardFormValues,
} from "../validation";

export default function Home() {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: emptyCardFormValues,
    // Validate a field when it loses focus, then re-validate it on every change.
    mode: "onTouched",
  });

  const [isComplete, setIsComplete] = useState(false);

  function handleValidSubmit() {
    setIsComplete(true);
  }

  function handleContinue() {
    form.reset();
    setIsComplete(false);
  }

  return (
    <FormProvider {...form}>
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
          <LiveCardDisplay />
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
              <CardForm onValidSubmit={handleValidSubmit} />
            )}
          </div>
        </section>
      </main>
    </FormProvider>
  );
}
