type CardPreviewProps = {
  cardholder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
};

export default function CardPreview({
  cardholder,
  cardNumber,
  expiryMonth,
  expiryYear,
}: CardPreviewProps) {
  return (
    // Sizes use container-query units so the card scales as one piece (desktop design: 447×245)
    <div
      className="@container aspect-[447/245] w-full rounded-[10px] text-white shadow-[0_40px_60px_rgba(0,0,0,0.14)]"
      style={{
        background:
          "radial-gradient(circle at 95% 5%, #f07c55 0%, transparent 32%)," +
          "radial-gradient(circle at 62% 18%, #c43fe2 0%, transparent 38%)," +
          "radial-gradient(circle at 68% 48%, rgba(95, 160, 235, 0.95) 0%, transparent 30%)," +
          "radial-gradient(circle at 42% 92%, #5b8ff0 0%, transparent 30%)," +
          "linear-gradient(135deg, #6448fe 0%, #7230dc 45%, #600594 100%)",
      }}
    >
      <div className="flex h-full flex-col px-[7.16cqw] pb-[6.5cqw] pt-[6.26cqw]">
        <div className="flex items-center gap-[3.58cqw]">
          <div className="size-[10.5cqw] rounded-full bg-white" />
          <div className="size-[4.7cqw] rounded-full border border-white" />
        </div>

        <p className="mt-auto whitespace-nowrap text-[6.26cqw] leading-none tracking-[0.12em]">
          {cardNumber
            ? cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")
            : "0000 0000 0000 0000"}
        </p>

        <div className="mt-[5.8cqw] flex items-center justify-between gap-4 text-[3.13cqw] leading-none tracking-[0.14em]">
          <p className="truncate uppercase">{cardholder || "Elham Bahramian"}</p>
          <p className="shrink-0">
            {expiryMonth || "00"}/{expiryYear || "00"}
          </p>
        </div>
      </div>
    </div>
  );
}
