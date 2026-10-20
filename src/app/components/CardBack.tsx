type CardBackProps = {
  cvc: string;
};

// Decorative "signature" lines, as widths in % of the line group (desktop design: 186px wide)
const lineRows = [
  [62, 12, 12, 4],
  [11, 32, 25, 4],
  [5, 12, 12, 62],
];

export default function CardBack({ cvc }: CardBackProps) {
  return (
    <div
      className="@container relative aspect-[447/245] w-full overflow-hidden rounded-[10px] shadow-[0_40px_60px_rgba(0,0,0,0.14)]"
      style={{
        background: "linear-gradient(165deg, #ffffff 0%, #e9eaee 45%, #d1d2d7 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-[9.4%] h-[22%] bg-[#2f2f2f]" />

      <div className="absolute left-[10%] right-[9.4%] top-[41.2%] flex h-[19.7%] lg:h-[15.5%] items-center justify-end rounded-[4px] bg-[#adb5be] px-[4cqw]">
        <span className="text-[3.13cqw] leading-none tracking-[0.14em] text-white">
          {cvc || "000"}
        </span>
      </div>

      {/* The mobile design leaves the signature lines out */}
      <div className="absolute left-[29.3%] top-[70.6%] hidden w-[41.6%] flex-col gap-[1.5cqw] lg:flex">
        {lineRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-[1.1cqw]">
            {row.map((width, index) => (
              <span
                key={index}
                className="h-[0.7cqw] rounded-full bg-[#adb5be]"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
