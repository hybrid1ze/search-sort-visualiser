"use client";
import { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton";

// Function to generate a sorted array of random numbers
const generateSortedRandomArray = (size: number, max: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max)).sort(
    (a, b) => a - b
  );

const InterpolationSearch = () => {
  // State variables for the array, target number, low, high, mid, isFound and tooltip
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(array.length - 1);
  const [mid, setMid] = useState<number | null>(null);
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [tooltip, setTooltip] = useState<string>("");

  // Function to reset the search
  const resetSearch = () => {
    const newArray = generateSortedRandomArray(20, 100);
    setArray(newArray);
    setLow(0);
    setHigh(newArray.length - 1);
    setMid(null);
    setIsFound(null);
    setTarget(null);
    setTooltip("Array has been reset.");
  };

  // Effect to reset the search when the component mounts
  useEffect(() => {
    resetSearch();
  }, []);

  // Function to perform a step of the interpolation search
  const interpolationSearchStep = () => {
    // Check if a target number has been specified
    if (target === null) {
      setTooltip("No target number specified.");
      return;
    }

    // Check if the target number is out of the range of the array
    if (low > high || target < array[low] || target > array[high]) {
      setIsFound(false);
      setTooltip("Target is not in the array.");
      return;
    }

    // Calculate the position to check in the array
    let position =
      low +
      Math.floor(
        ((high - low) / (array[high] - array[low])) * (target - array[low])
      );
    position = Math.max(low, Math.min(position, high));
    setMid(position);

    // Check if the target number has been found
    if (array[position] === target) {
      setIsFound(true);
      setMid(position);
      // Narrow down the search range to only include the found element
      setLow(position);
      setHigh(position);
      setTooltip(`Element found at position ${position + 1}.`);
    } else {
      // If not found, adjust the search range
      if (array[position] < target) {
        setLow(position + 1);
        setTooltip(
          `Searching in the upper half from position ${position + 1}.`
        );
      } else {
        setHigh(position - 1);
        setTooltip(
          `Searching in the lower half until position ${position - 1}.`
        );
      }
      setIsFound(null);
    }
  };

  // Render the component
  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Interpolation Search Visualisation</h1>
      </div>
      <BackButton />

      <div className="mt-4 flex justify-center">
        {array.map((value, index) => {
          // Determine if index is within the current search range
          const isWithinRange =
            low !== null && high !== null && index >= low && index <= high;
          // Determine if this is the mid value
          const isMid = mid === index;

          return (
            <span
              key={index}
              className={`inline-block m-1 p-2 border w-12 text-center 
                              ${
                                isMid
                                  ? "bg-green-300 border-green-500"
                                  : "border-gray-300"
                              }
                              ${isWithinRange ? "opacity-100" : "opacity-50"}
                              transition-all duration-500 ease-in-out`}
            >
              {value}
            </span>
          );
        })}
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
          value={target ?? ""}
          onChange={(e) => setTarget(parseInt(e.target.value, 10))}
        />
        <button
          onClick={interpolationSearchStep}
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
              Interpolation search is more efficient than linear search for
              large lists, with a time complexity of O(sqrt(n)).
            </li>
            <li>
              It doesn&apos;t require sorting the list, making it useful for
              unsorted lists.
            </li>
            <li>
              Interpolation search is easy to implement and can be adapted for
              different data structures, such as arrays or linked lists.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
              The interpolation search&apos;s efficiency depends on the
              block&apos;s size and the fixed interpolation size. If the
              interpolation size is too small or too large, the algorithm may
              not be as efficient.
            </li>
            <li>
              It can be slower than a binary search for some data sets,
              especially if the target value is near the beginning of the list.
            </li>
            <li>
              Interpolation search may not be as efficient as other search
              algorithms for some data types, such as data with irregular
              patterns or outliers.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterpolationSearch;