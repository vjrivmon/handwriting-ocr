import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatAccuracy(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return "text-green-600 dark:text-green-400";
  if (accuracy >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export function getAccuracyBgColor(accuracy: number): string {
  if (accuracy >= 80) return "bg-green-100 dark:bg-green-900/30";
  if (accuracy >= 60) return "bg-yellow-100 dark:bg-yellow-900/30";
  return "bg-red-100 dark:bg-red-900/30";
}
