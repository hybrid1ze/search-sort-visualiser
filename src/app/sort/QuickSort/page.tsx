"use client";
import React, { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton";

// Function to generate a random array
const generateRandomArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);

// Type for segments of the array being sorted
interface Segment {
  left: number;
  right: number;
}

const QuickSortVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [activeSegments, setActiveSegments] = useState<Segment[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = (): void => {
    const newArray: number[] = generateRandomArray(10, 100);
    setArray(newArray);
    setActiveSegments([{ left: 0, right: newArray.length - 1 }]);
    setPivotIndex(null);
    setIsSorted(false);
    setTooltip("Array reset. Ready to sort!");
  };

// Function to partition the array around a pivot
const partition = (arr: number[], left: number, right: number): number => {
        // Choose the rightmost element as pivot
        let pivot = arr[right];
        // Update the tooltip to show the pivot selection
        setTooltip(`Pivot selected at index ${right}.`);
        // Initialize the partition index
        let i = left;
        // Iterate over the elements in the current segment
        for (let j = left; j < right; j++) {
            // If the current element is less than the pivot, swap it with the element at the partition index
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                // Increment the partition index
                i++;
            }
        }
        // Swap the pivot with the element at the partition index
        [arr[i], arr[right]] = [arr[right], arr[i]];
        // Return the partition index
        return i;
};

// Function to perform a step in the quicksort
const quickSortStep = (): void => {
        // If there are no more active segments, the array is fully sorted
        if (activeSegments.length === 0) {
            setIsSorted(true);
            setTooltip("Array is fully sorted!");
            return;
        }

        // Copy the active segments array
        const segments = [...activeSegments];
        // Pop the last segment from the array
        const { left, right } = segments.pop() as Segment;

        // If the segment has more than one element
        if (left < right) {
            // Partition the segment around the pivot and get the partition index
            const index = partition(array, left, right);
            // Update the array state
            setArray([...array]);
            // Update the pivot index state
            setPivotIndex(index);
            // Push the segments to the right and left of the pivot to the active segments array
            segments.push({ left: index + 1, right });
            segments.push({ left, right: index - 1 });
            // Update the tooltip to show the partitioning
            setTooltip(`Partitioning at pivot index ${index}.`);
        } else {
            // If the segment has one or zero elements, it is already sorted
            setTooltip(`No more elements to sort in current segment.`);
        }

        // Update the active segments state
        setActiveSegments(segments);
};

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Quick Sort Visualization</h1>
      </div>
      <BackButton />

      <div
        className="mt-8 flex justify-center items-end"
        style={{ gap: "2px", height: "100px" }}
      >
        {array.map((value, index) => {
          let color = "bg-green-500";
          if (index === pivotIndex) {
            color = "bg-red-500";
          } else if (
            activeSegments.some(
              (segment) => index >= segment.left && index <= segment.right
            )
          ) {
            color = "bg-blue-500";
          }
          return (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: "50px" }}
            >
              <div
                className={`${color}`}
                style={{ height: `${value}px`, width: "100%" }}
              ></div>
              <span className="text-xs mt-1">{value}</span>{" "}
            </div>
          );
        })}
      </div>

      <div className="mt-4 mb-4 flex justify-center">
        <button
          onClick={quickSortStep}
          className="bg-blue-500 text-white p-2 ml-2"
          disabled={isSorted}
        >
          Next Step
        </button>
        <button onClick={resetArray} className="bg-red-500 text-white p-2 ml-2">
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
              QuickSort is one of the most efficient sorting algorithms, with
              average and best-case time complexity of O(n log n).
            </li>
            <li>
              It doesn&apos;t require any extra space as it sorts the list
              in-place (with the exception of recursive stack space).
            </li>
            <li>
              It has good cache performance in many scenarios due to its
              in-place nature.
            </li>
            <li>
              The tail recursive version of QuickSort is considered to be better
              than normal recursive version.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
              QuickSort has a worst-case time complexity of O(sqrt(2)), which
              can occur when the chosen pivot is the smallest or largest
              element, leading to unbalanced partitions.
            </li>
            <li>
              It is not a stable sorting algorithm, i.e., it does not maintain
              the relative order of equal elements.
            </li>
            <li>
              The efficiency of QuickSort greatly depends on the selection of
              the pivot. Poor pivot selection can lead to inefficient sortings.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuickSortVisualization;
