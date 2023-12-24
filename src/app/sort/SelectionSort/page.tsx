"use client";
import React, { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton";

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
            // Stop the sorting process
            setIsSorting(false);
            // Update the tooltip to indicate that the array is fully sorted
            setTooltip("Array is fully sorted.");
            return;
        }

        // Initialize the minimum index to the first unsorted element
        let minIndex = sortedIndex + 1;
        // Iterate over the unsorted part of the array
        for (let i = minIndex + 1; i < array.length; i++) {
            // If the current element is less than the current minimum, update the minimum index
            if (array[i] < array[minIndex]) {
                minIndex = i;
            }
        }

        // Always perform the swap
        const newArray = [...array];
        // Swap the first unsorted element with the minimum element
        [newArray[sortedIndex + 1], newArray[minIndex]] = [
            newArray[minIndex],
            newArray[sortedIndex + 1],
        ];
        // Update the array
        setArray(newArray);

        // Move the sorted/unsorted boundary to the right
        setSortedIndex(sortedIndex + 1);

        // Check if this was the last necessary swap
        if (sortedIndex + 1 >= array.length - 1) {
            // If so, stop the sorting process
            setIsSorting(false);
            // Update the tooltip to indicate that the array is fully sorted
            setTooltip("Array is fully sorted.");
        } else {
            // Otherwise, update the current minimum index
            setCurrentMinIndex(minIndex);
            // Update the tooltip to indicate the swap
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
      <BackButton />

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
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: "50px" }}
            >
              <div
                className={`${barColor}`}
                style={{ height: `${barHeight}px`, width: "100%" }}
              ></div>
              <span className="text-xs mt-1">{value}</span>{" "}
              
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

      <div className="grid grid-cols-2 gap-4 pt-32 px-2">
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-green-500 text-2xl">Pros</span>
          <ul className="list-disc pl-5">
            <li>Selection sort is simple to understand and implement.</li>
            <li>
              It doesn&apos;t require any extra space as it sorts the list
              in-place.
            </li>
            <li>For small lists, it can be efficient due to its simplicity.</li>
            <li>
              It performs the same number of comparisons regardless of the order
              of the input.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
              Selection sort has a worst-case and average time complexity of
              O(sqrt(n)), where n is the number of items being sorted. This
              makes it inefficient for large datasets.
            </li>
            <li>
              Due to its time complexity, it is not suitable for large datasets.
            </li>
            <li>
              Other algorithms such as QuickSort, MergeSort, HeapSort can
              perform much better and are preferred over Selection Sort.
            </li>
            <li>
              It is an unstable sorting algorithm, i.e., it does not maintain
              the relative order of equal elements.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectionSortVisualisation;
