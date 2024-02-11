import "@testing-library/jest-dom";
import { getPrayerTimesByCity } from "./prayerService";

describe("PrayerService", () => {
  it("should return prayer times for a given city", async () => {
    const prayerTimes = await getPrayerTimesByCity({
      city: "Berlin",
      country: "Germany",
    });

    expect(prayerTimes).toBeDefined();
    if (prayerTimes) {
      expect(prayerTimes.timings).toHaveProperty("Fajr");
      expect(prayerTimes.timings).toHaveProperty("Sunrise");
      expect(prayerTimes.timings).toHaveProperty("Dhuhr");
      expect(prayerTimes.timings).toHaveProperty("Asr");
      expect(prayerTimes.timings).toHaveProperty("Sunset");
      expect(prayerTimes.timings).toHaveProperty("Maghrib");
      expect(prayerTimes.timings).toHaveProperty("Isha");
      expect(prayerTimes.timings).toHaveProperty("Imsak");
      expect(prayerTimes.timings).toHaveProperty("Midnight");
      expect(prayerTimes.timings).toHaveProperty("Firstthird");
      expect(prayerTimes.timings).toHaveProperty("Lastthird");
    }
  });

  it("should return prayer times of today if date is not specified", async () => {
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const current_date = currentDate.replace(/\//g, "-");

    const prayerTimes = await getPrayerTimesByCity({
      city: "Berlin",
      country: "Germany",
    });

    expect(prayerTimes).toBeDefined();
    if (prayerTimes) {
      expect(prayerTimes.date).toBe(current_date);
    }
  });

  it("should return prayer times for a given city and date", async () => {
    const prayerTimes = await getPrayerTimesByCity({
      city: "Berlin",
      country: "Germany",
      date: "01-01-2021",
    });

    expect(prayerTimes).toBeDefined();
    if (prayerTimes) {
      expect(prayerTimes.date).toBe("01-01-2021");
    }
  });
});
