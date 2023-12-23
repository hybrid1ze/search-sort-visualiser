"use client";
import React, { useState, useEffect } from "react";

interface MergeStep {
  left: number;
  right: number;
  mid: number | null;
}

const generateRandomArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);

const MergeSortVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [auxiliaryArray, setAuxiliaryArray] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<MergeStep[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [highlightedIndices, setHighlightedIndices] = useState<{
    left: number;
    right: number;
  } | null>(null);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = (): void => {
    const newArray = generateRandomArray(10, 100);
    setArray(newArray);
    setAuxiliaryArray([...newArray]);
    setCurrentStep([]);
    setIsSorted(false);
    setHighlightedIndices(null);
    setTooltip("Array has been reset.");
  };

  const performMerge = (left: number, mid: number, right: number): number[] => {
    let result: number[] = [];
    let leftIndex = left;
    let rightIndex = mid + 1;

    while (leftIndex <= mid && rightIndex <= right) {
      if (auxiliaryArray[leftIndex] < auxiliaryArray[rightIndex]) {
        result.push(auxiliaryArray[leftIndex++]);
      } else {
        result.push(auxiliaryArray[rightIndex++]);
      }
    }

    while (leftIndex <= mid) {
      result.push(auxiliaryArray[leftIndex++]);
    }

    while (rightIndex <= right) {
      result.push(auxiliaryArray[rightIndex++]);
    }

    return result;
  };

  const mergeSortStep = () => {
    if (isSorted) return; // Prevent further sorting if already sorted

    let steps = [...currentStep];
    if (steps.length === 0) {
      if (array.length <= 1) {
        setIsSorted(true);
        return;
      }
      // Initialize the first step
      steps = [{ left: 0, right: array.length - 1, mid: null }];
    }

    const current = steps.pop();
    if (current) {
      if (current.mid === null) {
        // Split the array segment further
        const mid = Math.floor((current.left + current.right) / 2);
        steps.push({ left: current.left, right: current.right, mid }); // Prepare for merge
        setTooltip(
          `Preparing to merge segments: [${current.left}, ${mid}] and [${
            mid + 1
          }, ${current.right}]`
        );
        setHighlightedIndices({ left: current.left, right: current.right });
        if (current.right - current.left > 1) {
          steps.push({ left: mid + 1, right: current.right, mid: null }); // Right segment
          steps.push({ left: current.left, right: mid, mid: null }); // Left segment
        }
      } else {
        // Perform merge
        const merged = performMerge(current.left, current.mid, current.right);
        // Update the auxiliary array to reflect the merged segment
        let newAuxArray = [...auxiliaryArray];
        for (let i = current.left; i <= current.right; i++) {
          newAuxArray[i] = merged[i - current.left];
        }
        setAuxiliaryArray(newAuxArray);
        setArray([
          ...array.slice(0, current.left),
          ...merged,
          ...array.slice(current.right + 1),
        ]);
        setHighlightedIndices(null);
        setTooltip(
          `Merging segments: [${current.left}, ${current.mid}] and [${
            current.mid + 1
          }, ${current.right}]`
        );
      }
    }

    if (steps.length === 0) {
      setIsSorted(true);
      setTooltip("Array has been fully sorted."); // Tooltip for when the sorting is completed
    } else {
      setCurrentStep(steps);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Merge Sort Visualization</h1>
      </div>

      <div
        className="mt-8 flex justify-center items-end"
        style={{ gap: "2px", height: "100px" }}
      >
        {array.map((value, index) => (
          <div key={index} style={{ width: "50px" }}>
            <div
              className={`bg-blue-500 ${
                highlightedIndices &&
                index >= highlightedIndices.left &&
                index <= highlightedIndices.right
                  ? "bg-green-500"
                  : ""
              }`}
              style={{ height: `${value}px`, width: "100%" }}
            ></div>
            <span className="text-xs mt-1">{value}</span>{" "}
          </div>
        ))}
      </div>

      <div className="mt-4 mb-4 flex justify-center">
        <button
          onClick={mergeSortStep}
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
              Merge sort is more efficient with time complexity of O(n log n) in
              all cases (best, average, and worst).
            </li>
            <li>
              It is a stable sorting algorithm, i.e., it maintains the relative
              order of equal elements.
            </li>
            <li>
              Merge sort can handle larger lists and data sets that don&apos;t
              fit into the main memory. It&apos;s used in external sorting,
              where the data to sort is placed in external storage.
            </li>
            <li>
              Unlike QuickSort, the performance of Merge Sort doesn&apos;t
              depend on the initial ordering of the input.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
              Merge sort requires additional space equal to the array size, for
              the temporary arrays used during the merge step. This can be a
              problem for large data sets.
            </li>
            <li>
              The process of dividing and merging involves a lot of data
              movement which can be an overhead for large arrays.
            </li>
            <li>
              It&apos;s not an in-place sorting algorithm, which means the
              algorithm does not sort the input array using a constant amount of
              additional space.
            </li>
            <li>
              For smaller sizes of data, other algorithms like QuickSort,
              Insertion Sort can be faster than Merge Sort.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MergeSortVisualization;
