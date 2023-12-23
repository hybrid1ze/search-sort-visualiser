"use client";
import React, { useState, useEffect } from "react";

const generateRandomArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max));

const BubbleSortVisualisation = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorted, setSorted] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<[number, number] | null>(
    null
  );
  const [isResetting, setIsResetting] = useState<boolean>(false); // New state to handle reset status
  const [tooltip, setTooltip] = useState<string>("");
  const [resetCounter, setResetCounter] = useState(0);

  useEffect(() => {
    setArray(generateRandomArray(10, 100));
  }, []);

  useEffect(() => {
    if (isResetting) {
      setArray(generateRandomArray(10, 100)); // generate a new array
      setSorted(false);
      setActiveIndices(null);
      setIsResetting(false); // Reset completed
      setTooltip("Array has been reset.");
    }
  }, [isResetting]);

  const resetSort = () => {
    setIsResetting(true); // Initiate reset
    setResetCounter((prev) => prev + 1);
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

  const maxBarValue = Math.max(...array, 1);

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Bubble Sort Visualisation</h1>
      </div>

      <div
        className="mt-8 flex justify-center items-end"
        style={{ gap: "2px", height: "100px" }}
      >
        {array.map((value, index) => {
          // Normalize the height of the bar so that the tallest bar is 100px
          const barHeight = (value / maxBarValue) * 100;

          return (
            <div
              key={`${resetCounter}-${index}`}
              className="flex flex-col items-center"
              style={{ width: "50px" }}
            >
              <div
                className={`bg-blue-500 ${
                  activeIndices?.includes(index) ? "bg-green-500" : ""
                }`}
                style={{
                  height: `${barHeight}px`, // Use pixel value here
                  width: "100%", // Full width of the parent flex item
                  transition: "height 0.3s ease",
                }}
              ></div>
              <span className="text-xs mt-1">{value}</span>{" "}
              {/* Display the value under the bar */}
            </div>
          );
        })}
      </div>

      <div className="mt-4 mb-4 flex justify-center">
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
      <div className="mt-4 mb-4 flex justify-center">
        <span className="text-sm text-gray-600">{tooltip}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-32 px-2">
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-green-500 text-2xl">Pros</span>
          <ul className="list-disc pl-5">
            <li>Bubble sort is simple to understand and implement.</li>
            <li>
              It doesn&apos;t require any extra space as it sorts the list
              in-place.
            </li>
            <li>
              It is a stable sorting algorithm, i.e., it maintains the relative
              order of equal elements.
            </li>
            <li>
              It can detect an already sorted list in linear time (O(n)) due to
              its property of stopping if no swap has occurred.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
            Bubble sort has a worst-case and average time complexity of O(sqrt(n)), where n is the number of items being sorted. This makes it inefficient for large datasets.
            </li>
            <li>
            Due to its time complexity, it is not suitable for large datasets.
            </li>
            <li>
            Other algorithms such as QuickSort, MergeSort, HeapSort can perform much better and are preferred over Bubble Sort.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualisation;
