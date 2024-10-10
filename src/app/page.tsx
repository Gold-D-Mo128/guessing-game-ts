"use client";

import { useEffect, useCallback } from "react";
import useStore from "@/store/useStore"; // Importing the Zustand store
import Chat from "@/components/chat"; // Chat component
import PointsMultiplierCounter from "@/components/pointsMultiplierCounter"; // Component for point/multiplier counters
import Graph from "@/components/graph"; // Graph for visual representation
import SliderInput from "@/components/sliderInput"; // Slider for speed adjustment
import Table from "@/components/table"; // Custom table component
import Tag from "@/components/tag"; // Tag component for displaying info
import Person3Icon from "@mui/icons-material/Person3"; // MUI Icons
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"; // MUI Icons
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"; // MUI Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // MUI Icons
import StarRateIcon from "@mui/icons-material/StarRate"; // MUI Icons
import Welcome from "@/components/welcome"; // Welcome component for unauthenticated users
import { Player } from "@/store/useStore";

export default function Home() {
  const {
    playersData,
    initializePlayers,
    updatePlayerScores,
    resetGame,
    points,
    multiplier,
    StoppedAt,
    speed,
    started,
    end,
    setPoints,
    setMultiplier,
    setStoppedAt,
    setSpeed,
    startGame,
    endGame,
    startingPoints,
    setStartingPoints,
    player,
    auth,
  } = useStore();

  useEffect(() => {
    if (StoppedAt != null && end && StoppedAt > multiplier) {
      const wins = multiplier * points;
      const newStartingPoints = startingPoints + wins;
      if (newStartingPoints !== startingPoints) {
        setStartingPoints(newStartingPoints);
      }
    }
  }, [end, StoppedAt, multiplier, points, startingPoints, setStartingPoints]);

  useEffect(() => {
    if (end && StoppedAt !== null) {
      updatePlayerScores(StoppedAt);
    }
  }, [end, StoppedAt, updatePlayerScores]);

  const handleStartClick = useCallback(() => {
    if (end) {
      resetGame();
    }
    initializePlayers(points, multiplier);
    setStartingPoints(startingPoints - points);
    startGame();
  }, [
    initializePlayers,
    points,
    multiplier,
    startGame,
    resetGame,
    end,
    startingPoints,
    setStartingPoints,
  ]);

  const sortedPlayers = [...playersData].sort((a: Player, b: Player) => {
    if (b.score === null) return -1;
    if (a.score === null) return 1;
    return b.score - a.score;
  });

  function getCurrentTime(): string {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    return `${hours}:${minutes}`;
  }

  return (
    <main className="w-full h-full flex flex-col justify-center bg-[#181c24] p-6 gap-4">
      <div className="flex w-full h-[70%] gap-4 justify-center items-center">
        {!auth ? (
          <Welcome />
        ) : (
          <div className="w-[25%] h-full">
            <div className="flex flex-wrap gap-5 justify-between items-start">
              <PointsMultiplierCounter
                title="Points"
                setValue={setPoints}
                value={points}
              />
              <PointsMultiplierCounter
                title="Multiplier"
                setValue={setMultiplier}
                value={multiplier}
              />
              <button
                className="w-full rounded-md h-12 text-white font-bold text-sm"
                onClick={handleStartClick}
                style={{
                  background:
                    started && !end
                      ? "#8690a4"
                      : "linear-gradient(90deg, #e85672, #FC916B)",
                }}
                disabled={started && !end}
              >
                {!started ? "Start" : end ? "Start" : "Started"}
              </button>
            </div>
            <Table
              heads={["Name", "Points", "Multiplier"]}
              title="Current Round"
              icon={<EmojiEventsIcon />}
            >
              {playersData.map((user: Player, i: number) => (
                <tr
                  key={user.id}
                  className={`text-xs font-bold ${
                    i % 2 ? "bg-[#1a222c]" : "bg-[#272d39]"
                  } ${
                    started
                      ? end
                        ? StoppedAt !== null // Check if StoppedAt is not null
                          ? StoppedAt > (user.multiplier ?? 0)
                            ? "text-green-500"
                            : StoppedAt < (user.multiplier ?? 0)
                            ? "text-red-500"
                            : "text-white"
                          : "text-white" // Default class if StoppedAt is null
                        : "text-white"
                      : "text-white"
                  }`}
                >
                  <td className="py-1 px-4">{user.name}</td>
                  <td className="py-1 px-4">
                    {user.points != null ? user.points : "-"}
                  </td>
                  <td className="py-1 px-4">
                    {user.multiplier != null ? user.multiplier : "-"}
                  </td>
                </tr>
              ))}
            </Table>
            <SliderInput
              setSliderValue={setSpeed}
              value={speed}
              onGoing={started && !end}
            />
          </div>
        )}

        <div className="w-[55%] border-1 border-red-300 h-full">
          <div className="flex w-full h-fit justify-between gap-4 flex-wrap">
            <Tag
              icon={<MilitaryTechIcon />}
              info={auth ? startingPoints : ""}
            />
            <Tag icon={<Person3Icon />} info={player} />
            <Tag
              icon={<AccessTimeFilledIcon />}
              info={auth ? getCurrentTime() : ""} // Return empty string if auth is false
            />
            <Graph
              className="w-[100%] p-6 bg-[#242a39] rounded-lg grow h-fit relative"
              setStoppedAt={setStoppedAt}
              speed={speed}
              started={started}
              end={end || false}
              startGame={startGame}
              endGame={endGame}
            />
          </div>
        </div>
      </div>

      <div className="w-[80%] h-fit flex gap-4 justify-center items-end m-auto">
        <Table
          heads={["No.", "Name", "Score"]}
          title="Ranking"
          icon={<StarRateIcon />}
        >
          {sortedPlayers.map((user: Player, i: number) => (
            <tr
              key={i}
              className={`text-white text-sm font-medium ${
                i % 2 ? "bg-[#1a222c]" : "bg-[#272d39]"
              }`}
            >
              <td className="py-1 px-4">{i + 1}</td>
              <td className="py-1 px-4">{end ? user.name : "-"}</td>
              <td className="py-1 px-4">
                {user.score != null ? user.score : "-"}
              </td>
            </tr>
          ))}
        </Table>
        <Chat />
      </div>
    </main>
  );
}
