"use client";
import React, { useState, useEffect } from "react";

const generateSortedArray = (size: number, max: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max)).sort(
    (a, b) => a - b
  );

const JumpSearchVisualisation = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [blockStart, setBlockStart] = useState<number | null>(null);
  const [blockEnd, setBlockEnd] = useState<number | null>(null);
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [tooltip, setTooltip] = useState<string>("");
  const blockSize = Math.floor(Math.sqrt(array.length)); // Block size for jump search

  useEffect(() => {
    resetSearch();
  }, []);

  const resetSearch = () => {
    setArray(generateSortedArray(20, 100));
    setBlockStart(null);
    setBlockEnd(null);
    setIsFound(null);
    setTooltip("Array has been reset.");
  };

  const jumpSearchStep = () => {
    if (target === null) {
      setTooltip("No target number specified.");
      return;
    }

    let start = blockStart ?? 0;
    let end = Math.min(start + blockSize, array.length);

    if (array[end - 1] < target) {
      setBlockStart(end);
      setBlockEnd(null);
      setTooltip(`Jumping to block starting at index ${end}.`);
    } else {
      for (let i = start; i < end; i++) {
        if (array[i] === target) {
          setBlockStart(i);
          setBlockEnd(i + 1);
          setIsFound(true);
          setTooltip(`Element found at index ${i}.`);
          return;
        }
      }
      setIsFound(false);
      setTooltip(
        "Element not found in the current block. Try next block or reset."
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Jump Search Visualisation</h1>
      </div>

      <div className="mt-4 flex justify-center">
        {array.map((value, index) => (
          <span
            key={index}
            className={`inline-block m-1 p-2 border w-12 text-center 
                        ${
                          blockStart !== null &&
                          index >= blockStart &&
                          (blockEnd === null || index < blockEnd)
                            ? "bg-green-300 border-green-500"
                            : "border-gray-300"
                        } 
                        transition-all duration-500 ease-in-out`}
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
          value={target ?? ""}
          onChange={(e) => setTarget(parseInt(e.target.value, 10))}
        />
        <button
          onClick={jumpSearchStep}
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
              Jump search has better execution than linear search for large
              sorted lists.
            </li>
            <li>
              It has a time complexity of O(sqrt(n)), where n is the number of
              elements in the list.
            </li>
            <li>Jump search is simple and easy to implement.</li>
            <li>
              It works well with uniformly distributed data, where the maximum
              difference between consecutive elements is insignificant.
            </li>
            <li>
              Jump search is known for its efficiency when dealing with
              consecutive elements in sorted arrays. Jump search is a search
              algorithm that works well on sorted arrays by jumping ahead by a
              fixed number of elements to minimize the number of comparisons
              required.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-red-500 text-2xl">Cons</span>
          <ul className="list-disc pl-5">
            <li>
              Jump search requires the list of items to be sorted, which may not
              always be possible or practical.
            </li>
            <li>
              It may not be the best option for searching large datasets or when
              the elements are not uniformly distributed.
            </li>
            <li>
              The optimal jump size may be difficult to determine for specific
              datasets, which could lead to inefficiencies.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JumpSearchVisualisation;
