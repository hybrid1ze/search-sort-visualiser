"use client";
import React, { useState, useEffect } from "react";

const generateRandomArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max));

const BubbleSortVisualization = () => {
  const [array, setArray] = useState<number[]>(generateRandomArray(10, 100));
  const [sorted, setSorted] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<[number, number] | null>(
    null
  );
  const [isResetting, setIsResetting] = useState<boolean>(false); // New state to handle reset status
  const [tooltip, setTooltip] = useState<string>("");

  const normalizeHeight = (value: number, maxValue: number) => {
    const containerHeight = 100; // Assuming the container height is 100px
    return (value / maxValue) * containerHeight;
  };

  useEffect(() => {
    if (isResetting) {
      const newArray = generateRandomArray(10, 100);
      setArray(newArray);
      setSorted(false);
      setActiveIndices(null);
      setIsResetting(false); // Reset completed
    }
  }, [isResetting]);

  const resetSort = () => {
    setIsResetting(true); // Initiate reset
    setTooltip("Array has been reset.");
  };

  const bubbleSortStep = () => {
    if (sorted || isResetting) {
      // Don't sort if already sorted or currently resetting
      setTooltip("Sorting is complete or the array is resetting.");
      return;
    }
    let newArray = [...array];
    let swapped = false;
    for (let i = 0; i < newArray.length - 1; i++) {
      setActiveIndices([i, i + 1]);
      setTooltip(`Comparing indices ${i} and ${i + 1}.`);
      if (newArray[i] > newArray[i + 1]) {
        [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
        swapped = true;
        setTooltip(`Swapping elements at indices ${i} and ${i + 1}.`);
        break; // Break after one swap for step-by-step visualization
      }
    }
    if (!swapped) {
      setTooltip("Array is sorted. No more swaps needed.");
      setSorted(true);
    }
    setArray(newArray);
  };

  const maxValue = Math.max(...array);

  return (
    <div className="p-4">
        <div className="flex justify-center text-4xl">
        <h1>Bubble Sort Visualisation</h1>
      </div>
      <div className="flex justify-center">
        <button
          onClick={bubbleSortStep}
          className="bg-blue-500 text-white p-2 ml-2"
          disabled={sorted || isResetting}
        >
          Next Step
        </button>
        <button onClick={resetSort} className="bg-red-500 text-white p-2 ml-2">
          Reset
        </button>
      </div>
      <div
        className="mt-4 flex justify-center space-x-1"
        style={{ height: "100px" }}
      >
        {array.map((value, index) => {
          // Use the normalizeHeight function to calculate bar height
          const barHeight = normalizeHeight(value, maxValue);
          return (
            <div
              key={index}
              className={`w-4 bg-blue-500 ${
                activeIndices?.includes(index) ? "bg-red-500" : ""
              }`}
              style={{
                height: `${barHeight}px`,
                transition: "height 0.3s ease",
              }}
            />
          );
        })}
      </div>
      <div className="mt-4 mb-4 flex justify-center">
        <span className="text-sm text-gray-600">{tooltip}</span>
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
