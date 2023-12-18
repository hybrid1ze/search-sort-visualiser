'use client';
import { useState, useEffect, use } from "react";

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
        const mid = Math.floor((left + right) / 2);
        setMid(mid);

        if (array[mid] === target) {
            setIsFound(true);
            return;
        }
        if (array[mid] < target) {
            setLeft(mid + 1);
        } else {
            setRight(mid - 1);
        }
    } else {
        setIsFound(false);
}
};


  return (
    <div>
      <h1>Binary Search</h1>
    </div>
  );
};

export default BinarySearch;
