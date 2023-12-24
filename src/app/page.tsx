"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4 ">
      <div className="flex justify-center text-4xl">
        <h1>Search and Sort Visualisations</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-32 px-2">
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="flex justify-center text-2xl underline decoration-black">Search Algorithms</span>
          <ul className="flex flex-col items-center" >
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/search/LinearSearch">Linear Search</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/search/BinarySearch">Binary Search</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/search/InterpolationSearch">
                  Interpolation Search
                </Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/search/JumpSearch">Jump Search</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/search/ExponentialSearch">Exponential Search</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/search/TernarySearch">Ternary Search</Link>
              </button>
            </li>
          </ul>
        </div>
        <div className="outline outline-2 outline-slate-100 p-5">
          <span className="flex justify-center text-2xl underline decoration-black">Sort Algorithms</span>
          <ul className="flex flex-col items-center">
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/sort/BubbleSort">Bubble Sort</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/sort/SelectionSort">Selection Sort</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/sort/InsertionSort">
                Insertion Sort
                </Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/sort/QuickSort">Quick Sort</Link>
              </button>
            </li>
            <li className="m-4">
              <button className="bg-blue-500 text-white p-2 ml-2 rounded">
                <Link href="/sort/MergeSort">Merge Sort</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
