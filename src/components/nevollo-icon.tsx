import { cn } from "@/lib/utils";

export function NevolloIcon({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src="/favicon.svg"
      alt="Nevollo"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}
