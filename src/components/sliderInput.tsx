import React, { useState } from "react";
import SpeedIcon from "@mui/icons-material/Speed";

interface SliderInputProps {
  setSliderValue: (value: number) => void;
  value: number;
  onGoing: boolean;
}

/**
 * SliderInput Component
 *
 * This component provides a range slider input for selecting a speed value
 * between 1 and 5. It visually represents the current value on a gradient
 * background and displays the corresponding speed labels below the slider.
 *
 * Props:
 * - setSliderValue (function): A function to update the state of the slider's value.
 * - value (number): The current value of the slider, determining its position.
 * - onGoing (boolean): A flag that disables the slider when a process is ongoing.
 *
 * Rendering:
 * - Renders a header with a speed icon and label.
 * - Displays a range slider that updates the value based on user input.
 * - The slider's background color changes according to the current value,
 *   providing visual feedback on the selection.
 * - Below the slider, it displays the speed values (1x to 5x) with
 *   conditional styling to indicate the current selection.
 */

const SliderInput: React.FC<SliderInputProps> = ({
  setSliderValue,
  value,
  onGoing,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseFloat(e.target.value));
  };

  return (
    <>
      <h3 className="font-bold text-white h-14 flex justify-start items-center w-full gap-2 py-1">
        <SpeedIcon />
        Speed
      </h3>
      <div className="w-full max-w-md p-3 bg-gray-800 shadow-lg rounded-lg">
        <div className="relative pt-1">
          <input
            type="range"
            min="1"
            max="5"
            step={0.01}
            value={value}
            onChange={handleChange}
            className="sliderInput w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${
                ((value - 1) / 4) * 100
              }%, #374151 ${((value - 1) / 4) * 100}%, #374151 100%) `,
            }}
            disabled={onGoing}
          />

          <div className="flex justify-between w-full px-2 mt-1 ">
            {[1, 2, 3, 4, 5].map((speed) => (
              <span
                key={speed}
                className={`text-xs font-extrabold ${
                  speed <= value ? "text-[#ed5c66]" : "text-gray-500"
                }`}
              >
                {speed}x
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
