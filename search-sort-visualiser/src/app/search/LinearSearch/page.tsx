"use client";
import { useState, useEffect } from "react";

const generateRandomArray = (size: number, max: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max));

const LinearSearch = () => {
  const [array, setArray] = useState<number[]>([]); // Initialized to an empty array
  const [target, setTarget] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isFound, setIsFound] = useState<boolean | null>(null);

  useEffect(() => {
    setArray(generateRandomArray(20, 100));
  }, []);

  const resetSearch = () => {
    setArray(generateRandomArray(20, 100));
    setCurrentIndex(null);
    setIsFound(null);
  };

  const linearSearchStep = () => {
    if (target === null) return;
    // If we have a current index, increment it, otherwise start at 0
    const index = currentIndex !== null ? currentIndex + 1 : 0;

    // if at the end of the array, indicate that the target was not found
    if (index >= array.length) {
      setIsFound(false);
      return;
    }

    setCurrentIndex(index);

    if (array[index] === target) {
      setIsFound(true);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Linear Search Visualisation</h1>
      </div>
      <div className="mt-4 flex justify-center">
        {array.map((value, index) => (
          <span
            key={index}
            className={`inline-block m-1 p-2 border w-12 text-center ${
              currentIndex === index
                ? "bg-green-300 border-green-500"
                : "border-gray-300"
            } transition-all duration-500 ease-in-out`}
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
          value={target !== null ? target.toString() : ""}
          onChange={(e) =>
            setTarget(e.target.value ? parseInt(e.target.value, 10) : null)
          }
        />
        <button
          onClick={linearSearchStep}
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
      <div className="grid grid-cols-2 gap-4 pt-32 px-2">
  <div className="outline outline-2 outline-slate-100 p-5">
    <span className="underline decoration-green-500 text-2xl">Pros</span>
    <ul className="list-disc pl-5">
      <li>Simple and easy to implement.</li>
      <li>Works on unsorted and sorted lists.</li>
      <li>Requires minimal additional memory to perform the search.</li>
      <li>It can be used on various data structures, including arrays, linked lists, and other sequential data structures.</li>
      <li>Simple search algorithm.</li>
      <li>Best when looking for a single element.</li>
    </ul>
  </div>
  <div className="outline outline-2 outline-slate-100 p-5">
    <span className="underline decoration-red-500 text-2xl">Cons</span>
    <ul className="list-disc pl-5">
      <li>Has the worst execution time for large lists or arrays.</li>
      <li>The worst-case complexity is O(n), which means that the search time increases linearly with the size of the list or array.</li>
      <li>Not efficient for searching in sorted arrays or lists.</li>
      <li>It may have to examine the list of elements even if the target value is found early in the list, which can be inefficient, especially when searching for a single element.</li>
    </ul>
  </div>
</div>
    </div>
  );
};

export default LinearSearch;
