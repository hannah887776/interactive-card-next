import CardPreview from "./CardPreview";
import CardBack from "./CardBack";

type CardDisplayProps = {
  cardholder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
};

export default function CardDisplay({
  cardholder,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvc,
}: CardDisplayProps) {
  return (
    // Mobile: the 343×251 group (286px cards) scales down with the screen.
    // Desktop: --card-w drives the group, which is 541×527 for a 447px card.
    <div className="relative top-8 mx-auto aspect-[343/251] w-[calc(100%-32px)] max-w-[343px] lg:absolute lg:left-[min(11.4vw,164px)] lg:top-1/2 lg:mx-0 lg:aspect-auto lg:h-[calc(var(--card-w)*1.179)] lg:w-[calc(var(--card-w)*1.21)] lg:max-w-none lg:-translate-y-1/2 lg:[--card-w:clamp(340px,31vw,447px)]">
      <div className="absolute right-0 top-0 w-[83.4%] lg:bottom-0 lg:top-auto lg:w-[var(--card-w)]">
        <CardBack cvc={cvc} />
      </div>
      <div className="absolute left-0 top-[37.45%] z-10 w-[83.4%] lg:top-0 lg:w-[var(--card-w)]">
        <CardPreview
          cardholder={cardholder}
          cardNumber={cardNumber}
          expiryMonth={expiryMonth}
          expiryYear={expiryYear}
        />
      </div>
    </div>
  );
}
