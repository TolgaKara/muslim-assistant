"use server";
import axios from "axios";
import { DateTime } from "luxon";
const base_url = "http://api.aladhan.com/v1/";

type PrayerApiProps = {
  city: string;
  country: string;
  date?: string;
};

type PrayerApiByTimingsData = {
  data: {
    data: {
      timings: {
        Fajr: string;
        Sunrise: string;
        Dhuhr: string;
        Asr: string;
        Sunset: string;
        Maghrib: string;
        Isha: string;
        Imsak: string;
        Midnight: string;
      };
      date: {
        readable: string;
        timestamp: string;
        gregorian: {
          date: string;
          format: string;
          day: string;
          weekday: {
            en: string;
          };
          month: {
            number: number;
            en: string;
          };
          year: string;
          designation: {
            abbreviated: string;
            expanded: string;
          };
        };
      };
    };
  };
};

type PrayerByTimingsOptions = {
  city: string;
  country: string;
  method?: number;
  school?: number;
};

export type PrayerByTimingsReturn = {
  date: string;
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
  };
};

const stringToDatetime = (time: string, date: string) => {
  if (!date) {
    date = DateTime.now().toFormat("dd-LL-yyyy");
  }
  return DateTime.fromFormat(date + "_" + time, "dd-LL-yyyy_hh:mm");
};

export async function getPrayerTimesByCity({
  city,
  country,
  date,
}: PrayerApiProps): Promise<PrayerByTimingsReturn | null> {
  const options: PrayerByTimingsOptions = {
    city,
    country,
    school: 1,
    method: 5,
  };

  if (!date) {
    date = DateTime.now().toFormat("dd-LL-yyyy");
  }

  const url = base_url + "/timingsByCity/" + date;
  try {
    const { data }: PrayerApiByTimingsData = await axios.get(url, {
      params: options,
    });
    console.log("TIMINGS FROM API", data.data.timings);

    return { timings: data.data.timings, date: data.data.date.gregorian.date };
  } catch (error: any) {
    console.log("Error while fetching prayer times by city", error.message);
    return null;
  }
}
