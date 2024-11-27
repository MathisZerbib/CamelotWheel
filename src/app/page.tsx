"use client";

import { useState } from "react";
import CamelotWheel from "../components/CamelotWheel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // const getCompatibleKeys = (key: string): string[] => {
  //   const [number, letter] = key.split("");
  //   return [
  //     `${number}${letter === "A" ? "B" : "A"}`,
  //     `${(parseInt(number) + 1) % 12 || 12}${letter}`,
  //     `${parseInt(number) - 1 || 12}${letter}`,
  //     `${(parseInt(number) + 7) % 12 || 12}${letter}`,
  //   ];
  // };

  // const compatibleKeys = selectedKey ? getCompatibleKeys(selectedKey) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Camelot Wheel Key Matcher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CamelotWheel
            selectedKey={selectedKey}
            onKeySelect={setSelectedKey}
          />
        </CardContent>
      </Card>
      <footer className="absolute bottom-0 w-full text-center pb-4">
        <div className="text-sm text-gray-500">
          Created by{" "}
          <a
            href="https://github.com/MathisZerbib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            @mathisZerbib
          </a>
        </div>
      </footer>
    </div>
  );
}
