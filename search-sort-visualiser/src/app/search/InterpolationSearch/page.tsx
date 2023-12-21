'use client';
import { useState, useEffect } from "react";

const generateSortedRandomArray = (size: number, max: number) =>
    Array.from({ length: size}, () => Math.floor(Math.random() * max)).sort((a, b) => a - b);


const InterpolationSearch = () => {
    const [array, setArray] = useState<number[]>([]); // Initialized to an empty array
    const [target, setTarget] = useState<number | null>(null);
    const [low, setLow] = useState<number>(0);
    const [high, setHigh] = useState<number>(array.length - 1);
    const [mid, setMid] = useState<number | null>(null);
    const [isFound, setIsFound] = useState<boolean | null>(null);

    useEffect(() => {
        setArray(generateSortedRandomArray(20, 100));
    }, []);

    const resetSearch = () => {
        setArray(generateSortedRandomArray(20, 100));
        setLow(0);
        setHigh(array.length - 1);
        setMid(null);
        setIsFound(null);
        setTarget(null);
    }

    const interpolationSearchStep = () => { 
      if (target === null || low > high || target < array[low] || target > array[high]) {
        setIsFound(false);
        return;
      }

        // Estimate the position
    let position = low + Math.floor(((high - low) / (array[high] - array[low])) * (target - array[low]));

    // Avoid going out of bounds due to estimation
    position = Math.max(low, Math.min(position, high));

    setMid(position);

    if (array[position] === target) {
        setIsFound(true);
    } else {
        if (array[position] < target) {
            setLow(position + 1);
        } else {
            setHigh(position - 1);
        }
        // Continue the search in the next step
        setIsFound(null);
    }

    };

    return (
        <div className="p-4">
          <div>
            <input
              type="number"
              className="border-2 border-gray-200 p-2"
              placeholder="Enter a number to search"
              value={target ?? ""}
              onChange={(e) => setTarget(parseInt(e.target.value, 10))}
            />
            <button onClick={interpolationSearchStep} className="bg-blue-500 text-white p-2 ml-2">
              Next Step
            </button>
            <button onClick={resetSearch} className="bg-red-500 text-white p-2 ml-2">
              Reset
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            {array.map((value, index) => {
              // Determine if index is within the current search range
              const isWithinRange = (low !== null && high !== null) && (index >= low && index <= high);
              // Determine if this is the mid value
              const isMid = mid === index;
      
              return (
                <span
                  key={index}
                  className={`inline-block m-1 p-2 border w-12 text-center 
                              ${isMid ? 'bg-green-300 border-green-500' : 'border-gray-300'}
                              ${isWithinRange ? 'opacity-100' : 'opacity-50'}
                              transition-all duration-500 ease-in-out`}
                >
                  {value}
                </span>
              );
            })}
          </div>
          {isFound !== null && (
            <div className="mt-4">
              {isFound ? 'Element found!' : 'Element not found.'}
            </div>
          )}
        </div>
      );
      

 };

 export default InterpolationSearch;
