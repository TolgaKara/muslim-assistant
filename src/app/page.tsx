"use client";
import Card from "./components/Card";
import React from "react";
import { pageDescriptionList } from "./components/MenuDrawer";

export default function Home() {
  return (
    <div className="container mb-32 flex flex-wrap flex-col items-start md:flex-row md:justify-center text-start h-full mt-5">
      {pageDescriptionList.map((item) => {
        if (item.name === "Settings" || item.name === "Muslim assistant")
          return;
        return (
          <Card
            key={item.name}
            title={item.name}
            description={item.description}
            link={item.href}
          />
        );
      })}
    </div>
  );
}
