"use client";

import React, { useState, useEffect } from "react";

const generateSortedArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max)).sort(
    (a, b) => a - b
  );

const TernarySearchVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [bounds, setBounds] = useState<{ lower: number; upper: number }>({
    lower: 0,
    upper: array.length - 1,
  });
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
    resetSearch();
  }, []);

  const resetSearch = () => {
    setArray(generateSortedArray(20, 100));
    setBounds({ lower: 0, upper: array.length - 1 });
    setIsFound(null);
    setTarget(null);
    setTooltip("Array has been reset.");
  };

  const ternarySearchStep = () => {
    if (target === null) {
      setTooltip("No target number specified.");
      return;
    }

    const { lower, upper } = bounds;
    if (lower > upper) {
      setIsFound(false);
      setTooltip("Element not found.");
      return;
    }

    const partitionSize = Math.floor((upper - lower) / 3);
    const mid1 = lower + partitionSize;
    const mid2 = upper - partitionSize;

    if (array[mid1] === target) {
      setIsFound(true);
      setBounds({ lower: mid1, upper: mid1 });
      setTooltip(`Element found at index ${mid1}.`);
    } else if (array[mid2] === target) {
      setIsFound(true);
      setBounds({ lower: mid2, upper: mid2 });
      setTooltip(`Element found at index ${mid2}.`);
    } else if (target < array[mid1]) {
      setBounds({ lower, upper: mid1 - 1 });
      setTooltip(
        `Searching in the first third: indices ${lower} to ${mid1 - 1}.`
      );
    } else if (target > array[mid2]) {
      setBounds({ lower: mid2 + 1, upper });
      setTooltip(
        `Searching in the third third: indices ${mid2 + 1} to ${upper}.`
      );
    } else {
      setBounds({ lower: mid1 + 1, upper: mid2 - 1 });
      setTooltip(
        `Searching in the second third: indices ${mid1 + 1} to ${mid2 - 1}.`
      );
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Ternary Search Visualisation</h1>
      </div>

      <div className="mt-4 flex justify-center">
        {array.map((value, index) => (
          <span
            key={index}
            className={`inline-block m-1 p-2 border w-12 text-center 
                      ${
                        index >= bounds.lower && index <= bounds.upper
                          ? "bg-green-300"
                          : ""
                      }
                      ${
                        isFound === true && index === bounds.lower
                          ? "bg-blue-500"
                          : ""
                      }
                      ${isFound === false ? "opacity-50" : "opacity-100"}`}
          >
            {value}
          </span>
        ))}
      </div>
      {isFound !== null && (
        <div className="mt-4 mb-4 flex justify-center">
          {isFound ? "Element found!" : "Element not found."}
        </div>
      )}
      <div className="mt-4 mb-4 flex justify-center">
        <input
          type="number"
          className="border-2 border-gray-200 p-2"
          placeholder="Enter a number to search"
          value={target !== null ? target : ""}
          onChange={(e) => setTarget(parseInt(e.target.value, 10))}
        />
        <button
          onClick={ternarySearchStep}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Next Step
        </button>
        <button
          onClick={resetSearch}
          className="bg-red-500 text-white p-2 ml-2"
        >
          Reset
        </button>
      </div>
      <div className="mt-4 mb-4 flex justify-center">
        <span className="text-sm text-gray-600">{tooltip}</span>
      </div>
    </div>
  );
};
export default TernarySearchVisualization;
