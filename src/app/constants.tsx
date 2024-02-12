export type Prayer = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
export type Timing =
  | "Fajr"
  | "Sunrise"
  | "Dhuhr"
  | "Asr"
  | "Maghrib"
  | "Isha"
  | "Imsak"
  | "Midnight";

export const prayers: Prayer[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
export const allTimings: Timing[] = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
  "Imsak",
  "Midnight",
];
