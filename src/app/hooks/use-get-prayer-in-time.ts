import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Prayer, prayers } from "../components/PrayerTimeline";
import { PrayerTimings } from "./use-fetch-prayer-timings";

export const useGetPrayerInTime = ({
  currentTime,
  timings,
}: {
  currentTime: DateTime;
  timings: PrayerTimings | null;
}) => {
  const [prayerInTime, setPrayerInTime] = useState<Prayer | null>(null);
  useEffect(() => {
    if (!currentTime || !timings) {
      return;
    }

    for (let i = 0; i < prayers.length; i++) {
      if (i === prayers.length - 1) {
        setPrayerInTime(prayers[i]);
        break;
      }

      const prayer = prayers[i];
      if (
        currentTime > timings.timings[prayer] &&
        currentTime <= timings.timings[prayers[i + 1]]
      ) {
        setPrayerInTime(prayer);
      }
    }
  }, [currentTime]);

  return prayerInTime;
};
