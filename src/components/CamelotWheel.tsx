"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CamelotWheelProps {
  selectedKey: string | null;
  onKeySelect: (key: string) => void;
}

const CamelotWheel: React.FC<CamelotWheelProps> = ({
  selectedKey,
  onKeySelect,
}) => {
  const wheelData = [
    { camelot: "12B", key: "E Major", color: "fill-cyan-500" },
    { camelot: "1B", key: "B Major", color: "fill-emerald-500" },
    { camelot: "2B", key: "F# Major", color: "fill-green-500" },
    { camelot: "3B", key: "Db Major", color: "fill-lime-500" },
    { camelot: "4B", key: "Ab Major", color: "fill-yellow-500" },
    { camelot: "5B", key: "Eb Major", color: "fill-amber-500" },
    { camelot: "6B", key: "Bb Major", color: "fill-orange-500" },
    { camelot: "7B", key: "F Major", color: "fill-red-500" },
    { camelot: "8B", key: "C Major", color: "fill-rose-500" },
    { camelot: "9B", key: "G Major", color: "fill-pink-500" },
    { camelot: "10B", key: "D Major", color: "fill-purple-500" },
    { camelot: "11B", key: "A Major", color: "fill-indigo-500" },
    // Inner ring (minor keys) with darker shades
    { camelot: "12A", key: "C#m", color: "fill-cyan-600" },
    { camelot: "1A", key: "G#m", color: "fill-emerald-600" },
    { camelot: "2A", key: "D#m", color: "fill-green-600" },
    { camelot: "3A", key: "Bbm", color: "fill-lime-600" },
    { camelot: "4A", key: "Fm", color: "fill-yellow-600" },
    { camelot: "5A", key: "Cm", color: "fill-amber-600" },
    { camelot: "6A", key: "Gm", color: "fill-orange-600" },
    { camelot: "7A", key: "Dm", color: "fill-red-600" },
    { camelot: "8A", key: "Am", color: "fill-rose-600" },
    { camelot: "9A", key: "Em", color: "fill-pink-600" },
    { camelot: "10A", key: "Bm", color: "fill-purple-600" },
    { camelot: "11A", key: "F#m", color: "fill-indigo-600" },
  ];

  const getCompatibleKeys = (key: string): string[] => {
    const numberStr = key.slice(0, key.length - 1);
    const letter = key[key.length - 1];
    const number = parseInt(numberStr);

    const oppositeKey = `${number}${letter === "A" ? "B" : "A"}`;
    const nextKey = `${number === 12 ? 1 : number + 1}${letter}`;
    const prevKey = `${number === 1 ? 12 : number - 1}${letter}`;
    const relativeKey = `${((number + 6 - 1) % 12) + 1}${letter}`;

    return [oppositeKey, nextKey, prevKey, relativeKey];
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-2xl mx-auto">
      {/* Background circle */}
      <circle cx="200" cy="200" r="200" fill="#1f2937" />

      {/* Render wheel sections */}
      {wheelData.map((item, index) => {
        const isOuter = index < 12;
        const startAngle =
          index * (360 / (isOuter ? 12 : 12)) * (Math.PI / 180);
        const endAngle =
          (index + 1) * (360 / (isOuter ? 12 : 12)) * (Math.PI / 180);

        const innerRadius = isOuter ? 120 : 60;
        const outerRadius = isOuter ? 180 : 120;

        const x1 = 200 + innerRadius * Math.cos(startAngle);
        const y1 = 200 + innerRadius * Math.sin(startAngle);
        const x2 = 200 + outerRadius * Math.cos(startAngle);
        const y2 = 200 + outerRadius * Math.sin(startAngle);
        const x3 = 200 + outerRadius * Math.cos(endAngle);
        const y3 = 200 + outerRadius * Math.sin(endAngle);
        const x4 = 200 + innerRadius * Math.cos(endAngle);
        const y4 = 200 + innerRadius * Math.sin(endAngle);

        const path = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;

        const midAngle = (startAngle + endAngle) / 2;
        const midRadius = (innerRadius + outerRadius) / 2;
        const textX = 200 + midRadius * Math.cos(midAngle);
        const textY = 200 + midRadius * Math.sin(midAngle);

        const isSelected = item.camelot === selectedKey;
        const isCompatible = selectedKey
          ? getCompatibleKeys(selectedKey).includes(item.camelot)
          : false;

        return (
          <g
            key={item.camelot}
            onClick={() => onKeySelect(item.camelot)}
            className="cursor-pointer"
          >
            <path
              d={path}
              className={cn(
                "transition-all duration-300",
                item.color,
                isSelected
                  ? "fill-white stroke-black stroke-2"
                  : "stroke-gray-300 stroke-1",
                isCompatible
                  ? "opacity-100"
                  : selectedKey
                  ? "opacity-50"
                  : "opacity-100",
                "hover:opacity-90"
              )}
            />
            <text
              x={textX}
              y={textY - 10}
              textAnchor="middle"
              className={cn(
                "text-base font-bold",
                isSelected ? "fill-black" : "fill-gray-800"
              )}
              transform={`rotate(${
                (midAngle * 180) / Math.PI - 90
              }, ${textX}, ${textY})`}
            >
              {item.camelot}
            </text>
            <text
              x={textX}
              y={textY + 10}
              textAnchor="middle"
              className={cn(
                "text-sm font-medium",
                isSelected ? "fill-black" : "fill-gray-700"
              )}
              transform={`rotate(${
                (midAngle * 180) / Math.PI - 90
              }, ${textX}, ${textY})`}
            >
              {item.key}
            </text>
          </g>
        );
      })}

      {/* Center circle and text */}
      <circle cx="200" cy="200" r="60" fill="white" stroke="#e5e7eb" />
    </svg>
  );
};

export default CamelotWheel;
