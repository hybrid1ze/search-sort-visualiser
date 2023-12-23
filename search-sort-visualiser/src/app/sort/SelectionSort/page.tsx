"use client";
import React, { useState, useEffect } from "react";

const generateRandomArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);

const SelectionSortVisualisation = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortedIndex, setSortedIndex] = useState<number>(-1);
  const [currentMinIndex, setCurrentMinIndex] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(true);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
    setArray(generateRandomArray(10, 100));
  }, []);

  const selectionSortStep = () => {
    // If the sorting is already complete
    if (sortedIndex >= array.length - 1) {
      setIsSorting(false);
      setTooltip("Array is fully sorted.");
      return;
    }

    let minIndex = sortedIndex + 1;
    for (let i = minIndex + 1; i < array.length; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i;
      }
    }

    // Always perform the swap
    const newArray = [...array];
    [newArray[sortedIndex + 1], newArray[minIndex]] = [
      newArray[minIndex],
      newArray[sortedIndex + 1],
    ];
    setArray(newArray);

    // Move to the next index
    setSortedIndex(sortedIndex + 1);

    // Check if this was the last necessary swap
    if (sortedIndex + 1 >= array.length - 1) {
      setIsSorting(false);
      setTooltip("Array is fully sorted.");
    } else {
      setCurrentMinIndex(minIndex);
      setTooltip(
        `Swapped elements at indices ${sortedIndex + 1} and ${minIndex}.`
      );
    }
  };

  const resetSort = () => {
    setArray(generateRandomArray(10, 100));
    setSortedIndex(-1);
    setCurrentMinIndex(-1);
    setIsSorting(true);
    setTooltip("Array has been reset.");
  };

  // Normalization function for bar height
  const normalizeHeight = (value: number, maxValue: number) => {
    const containerHeight = 100;
    return (value / maxValue) * containerHeight;
  };

  const maxValue = Math.max(...array, 1);

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Selection Sort Visualisation</h1>
      </div>

      <div
        className="mt-8 flex justify-center items-end"
        style={{ gap: "2px", height: "100px" }}
      >
        {array.map((value, index) => {
          const barHeight = normalizeHeight(value, maxValue);
          let barColor = "bg-blue-500";
          if (index === currentMinIndex) barColor = "bg-red-500";
          if (index <= sortedIndex) barColor = "bg-green-500";

          return (
            <div key={index} className="flex flex-col items-center w-10">
              <div
                className={`${barColor}`}
                style={{ height: `${barHeight}px`, width: "100%" }}
              ></div>
              <span className="text-xs mt-1">{value}</span>{" "}
              {/* Display the value below the bar */}
            </div>
          );
        })}
      </div>

      <div className="mt-4 mb-4 flex justify-center">
        <button
          onClick={selectionSortStep}
          className="bg-blue-500 text-white p-2 ml-2"
          disabled={!isSorting}
        >
          Next Step
        </button>
        <button onClick={resetSort} className="bg-red-500 text-white p-2 ml-2">
          Reset
        </button>
      </div>

      <div className="mt-4 mb-4 flex justify-center">
        <span className="text-sm text-gray-600">{tooltip}</span>
      </div>
    </div>
  );
};

export default SelectionSortVisualisation;
