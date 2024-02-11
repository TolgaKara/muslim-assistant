import { DateTime } from "luxon";
import { getPrayerTimesByCity } from "../services/prayerService";
import { useEffect, useState } from "react";
// Help to create a React hook: https://dev.to/shaedrizwan/building-custom-hooks-in-react-to-fetch-data-4ig6

export type PrayerTimings = {
  date: DateTime;
  timings: {
    Fajr: DateTime;
    Sunrise: DateTime;
    Dhuhr: DateTime;
    Asr: DateTime;
    Sunset: DateTime;
    Maghrib: DateTime;
    Isha: DateTime;
    Imsak: DateTime;
    Midnight: DateTime;
  };
};

export const useFetchPrayerTimings = () => {
  const [prayerTimings, setPrayerTimings] = useState<PrayerTimings | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const resp = await getPrayerTimesByCity({
          city: "Berlin",
          country: "Germany",
        });

        if (resp) {
          const fetchedPrayerTimings = {
            date: DateTime.fromFormat(resp.date, "dd-LL-yyyy"),
            timings: {
              Fajr: DateTime.fromFormat(resp.timings.Fajr, "hh:mm"),
              Sunrise: DateTime.fromFormat(resp.timings.Sunrise, "hh:mm"),
              Dhuhr: DateTime.fromFormat(resp.timings.Dhuhr, "hh:mm"),
              Asr: DateTime.fromFormat(resp.timings.Asr, "hh:mm"),
              Sunset: DateTime.fromFormat(resp.timings.Sunset, "hh:mm"),
              Maghrib: DateTime.fromFormat(resp.timings.Maghrib, "hh:mm"),
              Isha: DateTime.fromFormat(resp.timings.Isha, "hh:mm"),
              Imsak: DateTime.fromFormat(resp.timings.Imsak, "hh:mm"),
              Midnight: DateTime.fromFormat(resp.timings.Midnight, "hh:mm"),
            },
          };
          setPrayerTimings(fetchedPrayerTimings);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return prayerTimings;
};
