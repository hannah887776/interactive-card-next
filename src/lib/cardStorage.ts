export type SavedCard = {
  id: string;
  cardholder: string;
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
};
const STORAGE_KEY = "saved-cards";

function isSavedCard(card: unknown): card is SavedCard {
  if (typeof card !== "object" || card === null) {
    return false;
  }

  return (
    "id" in card &&
    typeof card.id === "string" &&
    "cardholder" in card &&
    typeof card.cardholder === "string" &&
    "lastFourDigits" in card &&
    typeof card.lastFourDigits === "string" &&
    "expiryMonth" in card &&
    typeof card.expiryMonth === "string" &&
    "expiryYear" in card &&
    typeof card.expiryYear === "string"
  );
}

export function getSavedCards(): SavedCard[] {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return [];
  }

  const data: unknown = JSON.parse(savedData);

  if (!Array.isArray(data)) {
    throw new Error("Saved cards data is not an array");
  }

  if (!data.every(isSavedCard)) {
    throw new Error("Saved cards data is invalid");
  }

  return data;
}
export function saveCard(card: SavedCard): void {
  const cards = getSavedCards();

  cards.push(card);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function deleteCard(cardId: string): void {
  const cards = getSavedCards();

  const updatedCards = cards.filter(
    (card) => card.id !== cardId
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
}

