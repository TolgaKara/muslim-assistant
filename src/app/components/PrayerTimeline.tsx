"use client";
import React, { Fragment, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { TimelineItemPrimary, TimelineItemSecondary } from "./TimelineItem";
import { useFetchPrayerTimings } from "../hooks/use-fetch-prayer-timings";
import { useGetPrayerInTime } from "../hooks/use-get-prayer-in-time";
import { Button } from "@mui/material";
import { allTimings, prayers } from "../constants";

export default function PrayerTimeline() {
  const [showPrayersOnly, setShowPrayersOnly] = useState(true);
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());

  const fetchedPrayerTimes = useFetchPrayerTimings();
  const prayerInTime = useGetPrayerInTime({
    currentTime: currentTime,
    timings: fetchedPrayerTimes,
  });

  useEffect(() => {
    const now = DateTime.now();
    setCurrentTime(now);
    const interval = setInterval(() => {
      const now = DateTime.now();
      setCurrentTime(now);
    }, 1000);
    console.log("fetchedPrayerTimes", fetchedPrayerTimes);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-evenly flex-wrap h-full">
      <div className="text-center text-6xl md:text-8xl">
        {currentTime && currentTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-center md:items-baseline gap-y-4 md:gap-x-4">
        {showPrayersOnly &&
          fetchedPrayerTimes &&
          prayers.map((prayer) => (
            <Fragment key={prayer}>
              <TimelineItemSecondary
                content={fetchedPrayerTimes.timings[prayer].toLocaleString(
                  DateTime.TIME_24_SIMPLE
                )}
                highlighted={false}
              />
              <TimelineItemPrimary
                content={prayer}
                highlighted={prayer == prayerInTime}
              />
            </Fragment>
          ))}
        {!showPrayersOnly &&
          fetchedPrayerTimes &&
          allTimings.map((prayer) => (
            <Fragment key={prayer}>
              <TimelineItemSecondary
                content={fetchedPrayerTimes.timings[prayer].toLocaleString(
                  DateTime.TIME_24_SIMPLE
                )}
                highlighted={false}
              />
              <TimelineItemPrimary
                content={prayer}
                highlighted={prayer == prayerInTime}
              />
            </Fragment>
          ))}
      </div>

      <Button
        variant="text"
        className="mx-auto text-black"
        onClick={() => setShowPrayersOnly(!showPrayersOnly)}
      >
        {showPrayersOnly ? "Show all" : "Show prayers only"}
      </Button>
    </div>
  );
}
