

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSavedCards,
  deleteCard,
  type SavedCard,
} from "../../lib/cardStorage";

export default function CardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<SavedCard[]>([]);

  // Navigate to the home page to add a new card
  function handleAddNewCard() {
    router.push("/");
  }

  // Delete a card from localStorage and update the page
  function handleDeleteCard(cardId: string) {
    try {
      deleteCard(cardId);

      setCards((currentCards) =>
        currentCards.filter((card) => card.id !== cardId)
      );
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  }

  // Load saved cards when the page opens
  useEffect(() => {
    try {
      const savedCards = getSavedCards();

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCards(savedCards);
    } catch (error) {
      console.error("Failed to load saved cards:", error);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7fc] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink">
              My Cards
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your saved cards
            </p>
          </div>

          <div className="rounded-xl bg-white px-6 py-4 shadow-sm">
            <p className="text-sm text-gray-500">
              Total saved cards
            </p>

            <p className="mt-1 text-2xl font-semibold text-ink">
              {cards.length}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNewCard}
            className="h-[48px] rounded-lg bg-gradient-to-r from-[#6348fe] to-[#610595] px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            + Add New Card
          </button>
        </header>

        {cards.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-ink">
              No saved cards yet
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Add your first card to get started.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Saved Card
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                    Active
                  </span>
                </div>

                <p className="mb-5 text-xl font-semibold tracking-widest text-ink">
                  •••• •••• •••• {card.lastFourDigits}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Cardholder
                    </p>

                    <p className="font-medium text-ink">
                      {card.cardholder}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Expires
                    </p>

                    <p className="font-medium text-ink">
                      {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteCard(card.id)}
                  className="mt-6 w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete Card
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
