'use client';

import React, { useState, useEffect } from 'react';

const generateSortedArray = (size: number, max: number): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max)).sort((a, b) => a - b);

const TernarySearchVisualization = () => {
  const [array, setArray] = useState<number[]>(generateSortedArray(20, 100));
  const [target, setTarget] = useState<number | null>(null);
  const [bounds, setBounds] = useState<{ lower: number; upper: number }>({ lower: 0, upper: array.length - 1 });
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [tooltip, setTooltip] = useState<string>('');

  useEffect(() => {
    setArray(generateSortedArray(20, 100));
  }, []);

  const resetSearch = () => {
    setBounds({ lower: 0, upper: array.length - 1 });
    setIsFound(null);
    setTarget(null);
    setTooltip('Array has been reset.');
  };

  const ternarySearchStep = () => {
    if (target === null) {
      setTooltip('No target number specified.');
      return;
    }

    const { lower, upper } = bounds;
    if (lower > upper) {
      setIsFound(false);
      setTooltip('Element not found.');
      return;
    }

    const partitionSize = Math.floor((upper - lower) / 3);
    const mid1 = lower + partitionSize;
    const mid2 = upper - partitionSize;

    if (array[mid1] === target) {
      setIsFound(true);
      setBounds({ lower: mid1, upper: mid1 });
      setTooltip(`Element found at index ${mid1}.`);
    } else if (array[mid2] === target) {
      setIsFound(true);
      setBounds({ lower: mid2, upper: mid2 });
      setTooltip(`Element found at index ${mid2}.`);
    } else if (target < array[mid1]) {
      setBounds({ lower, upper: mid1 - 1 });
      setTooltip(`Searching in the first third: indices ${lower} to ${mid1 - 1}.`);
    } else if (target > array[mid2]) {
      setBounds({ lower: mid2 + 1, upper });
      setTooltip(`Searching in the third third: indices ${mid2 + 1} to ${upper}.`);
    } else {
      setBounds({ lower: mid1 + 1, upper: mid2 - 1 });
      setTooltip(`Searching in the second third: indices ${mid1 + 1} to ${mid2 - 1}.`);
    }
  };
};