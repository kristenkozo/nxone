import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gridCols(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "sm:grid-cols-2";
  if (count === 3) return "sm:grid-cols-2 lg:grid-cols-3";
  const rem4 = count % 4;
  const rem3 = count % 3;
  if (rem4 === 0) return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  if (rem3 === 0) return "sm:grid-cols-2 lg:grid-cols-3";
  if (rem4 >= rem3) return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  return "sm:grid-cols-2 lg:grid-cols-3";
}
