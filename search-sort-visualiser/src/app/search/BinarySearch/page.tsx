'use client';
import { useState, useEffect } from "react";

const generateRandomArray = (size: number, max: number) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max)).sort(
    (a, b) => a - b
  );

const BinarySearch = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [mid, setMid] = useState<number | null>(null);
  const [isFound, setIsFound] = useState<boolean | null>(null);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = generateRandomArray(20, 100);
    setArray(newArray);
    setLeft(0);
    setRight(newArray.length - 1);
    setMid(null);
    setIsFound(null);
  };

  const binarySearchStep = () => {
    if (left <= right) {
      const midIndex = Math.floor((left + right) / 2);
      setMid(midIndex);

      if (array[midIndex] === target) {
        setIsFound(true);
      } else if (array[midIndex] < target) {
        setLeft(midIndex + 1);
      } else {
        setRight(midIndex - 1);
      }
    } else {
      setIsFound(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center text-4xl">
        <h1>Binary Search Visualisation</h1>
      </div>
      
      <div className="mt-4 flex justify-center">
        {array.map((value, index) => (
          <span 
            key={index} 
            className={`inline-block m-1 p-2 border w-12 text-center 
                        ${mid === index ? 'bg-green-300 border-green-500' : 'border-gray-300'} 
                        ${index >= left && index <= right ? 'opacity-100' : 'opacity-50'}
                        transition-all duration-500 ease-in-out`}
          >
            {value}
          </span>
        ))}
      </div>

      {isFound !== null && (
        <div className="mt-4 mb-4 flex justify-center">
            {isFound ? 'Element found!' : 'Element not found.' }
        </div>
      )}

<div className="mt-4 mb-4 flex justify-center">
        <input
          type="text"
          className="border-2 border-gray-200 p-2"
          placeholder="Enter a number to search"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
        />
        <button
          onClick={binarySearchStep}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Next Step
        </button>
        <button onClick={resetArray} className="bg-red-500 text-white p-2 ml-2">
          Reset
        </button>
      </div>
      <div className="flex flex-row justify-between pt-32 px-2  ">
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="underline decoration-green-500 text-2xl">Pros</span>
          <ul className="list-disc pl-5">
            <li>
            A very efficient algorithm for large lists or arrays, as the time complexity is O(log n), where n is the number of elements in the list.
            </li>
            <li>
            Works only on sorted lists or arrays but can be faster than linear search on a sorted list.
            </li>
            <li>
            It is easy to understand and implement.
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
        <span className="underline decoration-red-500 text-2xl">Cons</span>
        <ul className="list-disc pl-5">
          <li>
          Requires the entire array to be sorted before performing the search, which can add extra overhead if the list is not already sorted.
          </li>
          <li>
          It requires random access to elements in the list, which can be a disadvantage in some data structures.
          </li>
          <li>
          It may require extra memory to maintain indices or pointers to the search interval.
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default BinarySearch;
