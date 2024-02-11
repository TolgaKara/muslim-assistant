import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PrayerTimeline from "./PrayerTimeline";
import { DateTime } from "luxon";
import { prayers, allTimings } from "./PrayerTimeline";
import React from "react";

jest.mock("../hooks/use-get-prayer-in-time", () => ({
  useGetPrayerInTime: jest.fn().mockReturnValue("Dhuhr"),
}));
describe("Prayer Timeline", () => {
  it("should render the current time in HH:MM format", () => {
    render(<PrayerTimeline />);
    const now = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);
    const currentTime = screen.getByText(now);
    expect(currentTime).toBeInTheDocument();
  });

  it("should render the prayer times", async () => {
    render(<PrayerTimeline />);
    for (const prayer of prayers) {
      const prayerTime = await screen.findByText(prayer);
      expect(prayerTime).toBeInTheDocument();
    }
  });

  it("should render the 'Show all' button", () => {
    render(<PrayerTimeline />);
    const showAllPrayersButton = screen.getByText("Show all");
    expect(showAllPrayersButton).toBeInTheDocument();
  });

  it("should render all the prayer timings, when show all is pressed", async () => {
    render(<PrayerTimeline />);
    const showAllPrayersButton = screen.getByText("Show all");
    fireEvent.click(showAllPrayersButton);
    for (const prayer of allTimings) {
      const prayerTime = await screen.findByText(prayer);
      expect(prayerTime).toBeInTheDocument();
    }
  });

  it("should render the 'Show prayers only' button, after 'Show all' is pressed", () => {
    render(<PrayerTimeline />);
    const showAllPrayersButton = screen.getByText("Show all");
    fireEvent.click(showAllPrayersButton);
    const showPrayersOnlyButton = screen.getByText("Show prayers only");
    expect(showPrayersOnlyButton).toBeInTheDocument();
  });

  it("should render the current prayer as highlighted", async () => {
    render(<PrayerTimeline />);
    const prayerInTime = await screen.findByTitle("prayer-in-time");
    expect(prayerInTime.textContent).toBe("Dhuhr");
  });
});
