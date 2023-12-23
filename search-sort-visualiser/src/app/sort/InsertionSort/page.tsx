"use client";

import React, { useState, useEffect } from "react";

const generateRandomArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);

const InsertionSortVisualisation = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [isSorting, setIsSorting] = useState(false);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    setArray(generateRandomArray(10, 100));
    setIsSorting(true);
  }, []);

  const insertionSortStep = () => {
    if (currentIdx < array.length) {
      let newArray = [...array];
      let key = newArray[currentIdx];
      let j = currentIdx - 1;

      while (j >= 0 && newArray[j] > key) {
        newArray[j + 1] = newArray[j];
        j--;
      }

      newArray[j + 1] = key;
      setArray(newArray);
      setCurrentIdx(currentIdx + 1);
      setTooltip(`Inserting ${key} at position ${j + 1}`);
    } else {
      setIsSorting(false);
      setTooltip("Array is fully sorted.");
    }
  };

  const resetSort = () => {
    setArray(generateRandomArray(10, 100));
    setCurrentIdx(1);
    setIsSorting(true);
    setTooltip("");
  };

  const maxValue = Math.max(...array, 1);

  const normaliseHeight = (value: number, maxValue: number): number => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Insertion Sort Visualisation</h1>
      </div>

      <div
        className="mt-8 flex justify-center items-end"
        style={{ gap: "2px", height: "100px" }}
      >
        {array.map((value, index) => {
          const barHeight = normaliseHeight(value, maxValue);
          let barColor = index < currentIdx ? "bg-green-500" : "bg-blue-500";
          return (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: "50px" }}
            >
              <div
                className={barColor}
                style={{ height: `${barHeight}px`, width: "100%" }}
              ></div>
              <span className="text-xs mt-1">{value}</span>{" "}
              
            </div>
          );
        })}
      </div>

      <div className="mt-4 mb-4 flex justify-center">
        <button
          onClick={insertionSortStep}
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

export default InsertionSortVisualisation;
