"use client";

import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CounterProps {
  points: number;
  increase: () => void;
  decrease: () => void;
  title: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  tailwind: string;
}

/**
 * Counter Component
 *
 * This component provides a user interface for increasing or decreasing a
 * numeric value (points). It features buttons for incrementing and
 * decrementing the value, as well as an input field for direct entry.
 *
 * Props:
 * - points (number): The current value to be displayed and modified.
 * - increase (function): Function to be called when the increase button is clicked.
 * - decrease (function): Function to be called when the decrease button is clicked.
 * - title (string): The label for the counter to indicate what it represents.
 * - handleInputChange (function): Function to handle changes in the input field.
 * - ...rest: Any additional props to be passed to the input element.
 *
 * Component Structure:
 * - Title: Displays the title prop as a label above the counter.
 * - Buttons:
 *   - Decrease: Decreases the value when clicked.
 *   - Increase: Increases the value when clicked.
 * - Input Field: Allows direct input of the numeric value.
 *
 * Accessibility:
 * - Each button has an aria-label for better accessibility.
 *
 * Styles:
 * - The component is styled using Tailwind CSS for a modern and responsive design.
 * - It features a gradient background, rounded corners, and hover effects on buttons.
 */

export default function Counter({
  points,
  increase,
  decrease,
  title,

  handleInputChange,
}: CounterProps) {
  return (
    <div className="bg-gradient-to-r from-[#171b23] to-[#242b3a] text-center text-white rounded-lg items-center justify-between px-2 py-1 grow border border-[#242a38]">
      <span className="text-xs text-gray-400 text-center w-full">{title}</span>
      <div className="flex w-full justify-center gap-2">
        <button
          onClick={decrease}
          className="text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center border border-gray-600 rounded-md"
          aria-label="Decrease value"
        >
          <ArrowDropDownIcon fontSize="large" />
        </button>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={points}
            onChange={handleInputChange}
            className="bg-[#101318] text-center text-l font-bold w-20 focus:outline-none px-2 h-full rounded-md caret-transparent"
            aria-label={`${title} value`}
            min="0"
            max="10"
            step="0.01"
          />
        </div>
        <button
          onClick={increase}
          className="text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center border border-gray-600 rounded-md"
          aria-label="Increase value"
        >
          <ArrowDropUpIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}
