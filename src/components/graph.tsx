"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

/**
 * Graph Component
 *
 * This component renders a line graph using the Recharts library to visualize
 * the growth of a multiplier value over time. The graph updates dynamically
 * based on game state and user interactions.
 *
 * Props:
 * - className (string): Additional class names for styling the component.
 * - setStoppedAt (function): Function to set the value at which the graph stops updating.
 * - speed (number): Affects the speed at which the graph updates (higher is faster).
 * - started (boolean): Indicates if the game has started.
 * - end (boolean): Indicates if the game has ended.
 * - startGame (function): Function to be called when starting the game (not used in this component).
 * - endGame (function): Function to be called when the game ends.
 *
 * State:
 * - visibleData (array): Stores the data points to be displayed in the graph.
 * - counter (number): Tracks the current multiplier value for display.
 * - randomNumber (number): Holds the randomly generated number that determines where the graph stops.
 *
 * Lifecycle:
 * - useEffect: Monitors the `started`, `end`, and `speed` props. When the game starts:
 *   - Generates a random number and calls `setStoppedAt`.
 *   - Creates an array of data points to be displayed.
 *   - Updates the visible data at a set interval, based on the speed prop.
 *   - Calls `endGame` when all data points have been displayed.
 *
 * - useCallback: Optimizes the `generateData` function, which generates data points
 *   based on the randomly generated stopping value. It creates a quadratic curve
 *   for the first part of the graph and maintains a constant value afterward.
 *
 * Rendering:
 * - The graph is rendered using the `LineChart`, `XAxis`, and `YAxis` components from Recharts.
 * - The multiplier value is displayed prominently in the center of the graph.
 *
 * Styling:
 * - The component is responsive and uses Tailwind CSS for styling, including a
 *   dynamic text size and positioning for the multiplier display.
 */

interface GraphProps {
  className: string;
  setStoppedAt: (value: number) => void;
  speed: number;
  started: boolean;
  end: boolean;
  endGame: () => void;
}

interface DataPoint {
  name: number;
  uv: number;
}

export default function Graph({
  className,
  setStoppedAt,
  speed,
  started,
  end,
  endGame,
}: GraphProps) {
  const [visibleData, setVisibleData] = useState<DataPoint[]>([]);
  const [counter, setCounter] = useState<number>(0);

  const generateData = useCallback((stoppedAt: number): DataPoint[] => {
    const newData: DataPoint[] = [];
    for (let i = 0; i <= stoppedAt * 10; i++) {
      const x = i / 10;
      let uv: number;
      if (x <= stoppedAt) {
        // Quadratic curve up to stoppedAt
        uv = (x / stoppedAt) * (x / stoppedAt) * 10;
      } else {
        // Constant value after stoppedAt
        uv = 10;
      }
      newData.push({
        name: parseFloat(x.toFixed(2)),
        uv: parseFloat(uv.toFixed(2)),
      });
    }
    return newData;
  }, []);

  useEffect(() => {
    if (started && !end) {
      const newRandomNumber = parseFloat((Math.random() * 9 + 1).toFixed(2));

      setStoppedAt(newRandomNumber);

      const newData = generateData(newRandomNumber);
      setVisibleData([]);
      setCounter(0);

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < newData.length) {
          setVisibleData((prev) => [...prev, newData[currentIndex]]);
          setCounter(parseFloat(newData[currentIndex].name.toFixed(3)));
          currentIndex++;
        } else {
          clearInterval(interval);
          endGame();
        }
      }, 100 / speed);

      return () => clearInterval(interval);
    } else if (!started) {
      setVisibleData([]);
      setCounter(0);
    }
  }, [started, end, speed, setStoppedAt, endGame, generateData]);

  return (
    <div className={className}>
      <span className=" left-[50%] translate-x-[-50%] flex items-center justify-center text-center text-white text-6xl font-extrabold absolute top-[10%] z-20">
        {counter.toFixed(2)}x
      </span>
      <ResponsiveContainer className="relative w-full" height={410}>
        <LineChart data={visibleData}>
          <XAxis
            dataKey="name"
            tickLine={false}
            domain={[0, 10]}
            type="number"
            tickCount={11}
          />
          <YAxis hide domain={[0, 10]} />
          <Line
            dataKey="uv"
            stroke="#e45d59"
            strokeWidth={5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
