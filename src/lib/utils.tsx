import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateRandomHexColor = (): string => {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert to hexadecimal and pad with zeros if needed
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Combine components and return with # prefix
  return `#${redHex}${greenHex}${blueHex}`.toUpperCase();
};

export const calculateTime = (timeString: string) => {
  const sec = parseFloat(timeString) % 60;
  const min = Number(timeString) / 60;
  return  `${min.toFixed(0)}m ${sec.toFixed(0)}s`
}