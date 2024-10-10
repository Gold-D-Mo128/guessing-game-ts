"use client";

import useStore from "@/store/useStore";
import React, { useState, ChangeEvent } from "react";

/**
 * Welcome Component
 *
 * This component serves as a welcome screen for the user, prompting them
 * to input their name before proceeding with the application. It manages
 * the state of the user's name and handles authentication via a global
 * store. Upon entering their name and clicking the 'Accept' button, the
 * user's name is set in the store, and authentication is marked as true.
 *
 * State:
 * - `value`: A local state variable that holds the current input value from
 *   the text field for the player's name.
 *
 * Functionality:
 * - Displays a welcome message and an input field for the user to enter
 *   their name.
 * - The 'Accept' button is enabled only when the input field is not empty.
 * - Upon clicking the 'Accept' button, the component sets the player's name
 *   in the global state and updates the authentication status.
 *
 * Styling:
 * - The component uses Tailwind CSS for styling, providing a responsive
 *   and visually appealing layout.
 *
 * Usage:
 * ```tsx
 * <Welcome />
 * ```
 */

interface StoreState {
  player: string;
  setPlayer: (name: string) => void;
  setAuth: (auth: boolean) => void;
}

export default function Welcome(): JSX.Element {
  const { player, setPlayer, setAuth } = useStore() as StoreState;
  const [value, setValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleAccept = (): void => {
    setAuth(true);
    setPlayer(value);
  };

  const buttonStyle: React.CSSProperties = {
    background:
      value === "" ? "#8690a4" : "linear-gradient(90deg, #e85672, #FC916B)",
  };

  const buttonHoverStyle: React.CSSProperties = {
    background:
      value === "" ? "#8690a4" : "linear-gradient(90deg, #e4627c, #fba180)",
  };

  return (
    <div className="w-[25%] h-full bg-[#242a39] rounded-md flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center w-80">
        <h1 className="text-3xl text-gray-300 mb-6 self-start">Welcome</h1>
        <p className="text-gray-400 mb-4 text-xs">Please Insert Your Name</p>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="bg-gray-700 text-center text-white p-2 w-full rounded-md focus:outline-none"
          placeholder="Your name"
          aria-label="Enter your name"
        />
        <button
          onClick={handleAccept}
          style={buttonStyle}
          className="mt-6 text-white w-full py-2 rounded-md transition-all duration-300 ease-in-out"
          onMouseOver={(e) => {
            e.currentTarget.style.background =
              buttonHoverStyle.background as string;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = buttonStyle.background as string;
          }}
          disabled={value === ""}
          aria-label="Accept and proceed"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
