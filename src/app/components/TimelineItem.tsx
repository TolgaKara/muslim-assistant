import React from "react";

export function TimelineItemPrimary({
  content,
  highlighted,
}: {
  content: string;
  highlighted: boolean;
}) {
  if (highlighted) {
    return (
      <div
        title="prayer-in-time"
        className="font-bold text-4xl md:text-6xl lg:text-8xl"
      >
        {content}
      </div>
    );
  } else {
    return <div className="text-xl md:text-xl lg:text-4xl">{content}</div>;
  }
}

export function TimelineItemSecondary({
  content,
  highlighted,
}: {
  content: string;
  highlighted: boolean;
}) {
  if (highlighted) {
    return (
      <div className="text-sm md:text-base">
        <strong>{content}</strong>
      </div>
    );
  } else {
    return <div className="text-sm md:text-base">{content}</div>;
  }
}
