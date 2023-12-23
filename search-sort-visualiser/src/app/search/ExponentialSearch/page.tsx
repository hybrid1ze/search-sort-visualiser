"use client";
import React, { useState, useEffect } from "react";

const generateSortedArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max)).sort(
    (a, b) => a - b
  );

const ExponentialSearchVisualization = () => {
  const [array, setArray] = useState<number[]>(generateSortedArray(20, 100));
  const [target, setTarget] = useState<number | null>(null);
  const [bounds, setBounds] = useState<{ lower: number; upper: number }>({
    lower: 0,
    upper: 1,
  });
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
    resetSearch();
  }, []);

  const resetSearch = () => {
    setArray(generateSortedArray(20, 100));
    setBounds({ lower: 0, upper: 1 });
    setIsFound(null);
    setTarget(null);
    setTooltip("Array has been reset.");
  };

  const exponentialSearchStep = () => {
    if (target === null) {
      setTooltip("No target number specified.");
      return;
    }

    if (bounds.upper < array.length && array[bounds.upper] < target) {
      const newUpper = Math.min(bounds.upper * 2, array.length);
      setBounds({ lower: bounds.upper, upper: newUpper });
      setTooltip(
        `Expanding search range to indices ${bounds.upper} to ${newUpper}.`
      );
    } else {
      const result = binarySearch(
        array,
        target,
        bounds.lower,
        Math.min(bounds.upper, array.length - 1)
      );
      setIsFound(result !== -1);
      if (result !== -1) {
        // Update bounds to only include the found element
        setBounds({ lower: result, upper: result });
        setTooltip(`Element found at index ${result}.`);
      } else {
        setTooltip("Element not found.");
      }
    }
  };

  const binarySearch = (
    arr: number[],
    x: number,
    start: number,
    end: number
  ): number => {
    if (start > end) return -1;
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] > x) return binarySearch(arr, x, start, mid - 1);
    return binarySearch(arr, x, mid + 1, end);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Exponential Search Visualisation</h1>
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
                          isFound === true &&
                          index ===
                            binarySearch(
                              array,
                              target!,
                              bounds.lower,
                              bounds.upper
                            )
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
          onClick={exponentialSearchStep}
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

      <div className="grid grid-cols-2 gap-4 pt-32 px-2">
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-green-500 text-2xl">Pros</span>
          <ul className="list-disc pl-5">
            <li>
              Exponential search has a time complexity of O(log n), where n is
              the number of elements in the entire list.
            </li>
            <li>
              It is more efficient than linear search and works well with large
              datasets.
            </li>
            <li>Exponential search is simple and easy to implement.</li>
            <li>It can be used with unbounded or infinite lists.</li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
              Exponential search requires sorting the entire list, which may not
              always be possible or practical.
            </li>
            <li>
              The algorithm may not be efficient for datasets where the target
              value is located near the beginning of the list.
            </li>
            <li>
              The optimal interval size may be difficult to determine for
              particular datasets, which could lead to inefficiencies.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExponentialSearchVisualization;
