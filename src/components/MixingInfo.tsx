import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MixingInfoProps {
  selectedKey: string | null;
  compatibleKeys: string[];
}

const MixingInfo: React.FC<MixingInfoProps> = ({
  selectedKey,
  compatibleKeys,
}) => {
  const getMixType = (selectedKey: string, compatibleKey: string): string => {
    const selectedNumber = parseInt(selectedKey.slice(0, -1));
    const selectedLetter = selectedKey.slice(-1);
    const compatibleNumber = parseInt(compatibleKey.slice(0, -1));
    const compatibleLetter = compatibleKey.slice(-1);

    // 1. Energy Change: Same number, different letter
    if (
      selectedNumber === compatibleNumber &&
      selectedLetter !== compatibleLetter
    ) {
      return "Energy Change";
    }

    // 2. Subtle Mix: Same letter, adjacent numbers (wrap around 1 and 12)
    const isAdjacent =
      (selectedNumber === compatibleNumber + 1 ||
        selectedNumber === compatibleNumber - 1 ||
        (selectedNumber === 1 && compatibleNumber === 12) ||
        (selectedNumber === 12 && compatibleNumber === 1)) &&
      selectedLetter === compatibleLetter;

    if (isAdjacent) {
      return "Subtle Mix";
    }

    // 3. Perfect Fifth: Handle fifth logic correctly with modulo
    const fifthNumber = ((selectedNumber + 7 - 1) % 12) + 1; // Map to 1-12 range
    if (
      compatibleNumber === fifthNumber &&
      selectedLetter === compatibleLetter
    ) {
      return "Perfect Fifth";
    }

    return "Subtle Mix"; // Fallback
  };

  if (!compatibleKeys.length || !selectedKey) {
    return null;
  }

  if (!selectedKey) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">
          Mixing Options for {selectedKey}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {compatibleKeys.map((key) => (
            <li key={key} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{key}</span>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {getMixType(selectedKey, key)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {getMixType(selectedKey, key) === "Energy Change"
                  ? "Same tempo, change in mood. Great for maintaining energy while shifting the emotional tone."
                  : getMixType(selectedKey, key) === "Subtle Mix"
                  ? "Smooth transition with a slight key change. Perfect for gradual progression in your mix."
                  : "Dramatic change, ideal for builds and drops. Use for impactful moments in your set."}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MixingInfo;
