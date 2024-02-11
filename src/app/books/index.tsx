import React from "react";
import Card from "../components/Card";

export default function Books() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl tracking-wide">Muslim Assistants</h1>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Card title="Books" description="Find the Coran, the Sunnah" link="" />
        <Card title="Prayer" description="Find the time of prayers" link="" />
        <Card title="Mosques" description="Find mosques around you" link="" />
      </div>
    </main>
  );
}
