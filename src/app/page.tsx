import Card from "./components/Card";
import ResponsiveDrawer from "./components/MenuDrawer";
import PrayerTimeline from "./components/PrayerTimeline";
import React from "react";

export default function Home() {
  return (
    <div className="mb-32 flex text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <Card
        title="Books"
        description="Find the Coran, the Sunnah"
        link="/books"
      />
      <Card
        title="Prayer"
        description="Find the time of prayers"
        link="/prayer"
      />
      <Card
        title="Mosques"
        description="Find mosques around you"
        link="/mosques"
      />
    </div>
  );
}

{
  /* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Card
          title="Books"
          description="Find the Coran, the Sunnah"
          link="/books"
        />
        <Card title="Prayer" description="Find the time of prayers" link="" />
        <Card title="Mosques" description="Find mosques around you" link="" />
      </div> */
}
