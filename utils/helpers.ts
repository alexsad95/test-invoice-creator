import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomUUID(): string {
  const rnds = new Array(16);

  for (let i = 0; i < 16; i++) {
    rnds[i] = Math.floor(Math.random() * 256);
  }

  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  const hex = rnds.map(b => b.toString(16).padStart(2, "0"));

  return (
    hex.slice(0, 4).join("") +
    hex.slice(4, 6).join("") + "-" +
    hex.slice(6, 8).join("") + "-" +
    hex.slice(8, 10).join("") + "-" +
    hex.slice(10, 12).join("") + "-" +
    hex.slice(12, 16).join("")
  );
}
