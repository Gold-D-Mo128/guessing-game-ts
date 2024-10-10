import { create } from "zustand";

export interface Player {
  id: number;
  name: string;
  points: number | null;
  multiplier: number | null;
  score: number | null;
}

interface GameStore {
  player: string;
  auth: boolean;
  playersData: Player[];
  points: number;
  multiplier: number;
  PlayersMultipliers: number[];
  StoppedAt: number | null;
  speed: number;
  started: boolean;
  end: boolean | null;
  onGoing: boolean;
  startingPoints: number;
  addPlayer: (player: Player) => void;
  updatePlayer: (id: number, newData: Partial<Player>) => void;
  resetPlayers: () => void;
  initializePlayers: (points: number, multiplier: number) => void;
  updatePlayerScores: (stoppedAt: number) => void;
  setSpeed: (speed: number) => void;
  setMultiplier: (multiplier: string | number) => void;
  setPoints: (points: string | number) => void;
  setPlayersMultiplier: (PlayersMultipliers: number[]) => void;
  setStoppedAt: (StoppedAt: number) => void;
  setStartingPoints: (startingPoints: number) => void;
  setPlayer: (player: string) => void;
  setAuth: (auth: boolean) => void;
  startGame: () => void;
  endGame: () => void;
  setGameState: (started: boolean, end: boolean) => void;
  resetGame: () => void;
}

const getRandomValues = () => {
  const randomPoints = Math.floor(Math.random() * 100) + 1;
  const randomMultiplier = (Math.random() * 10).toFixed(2);
  return { randomPoints, randomMultiplier };
};

const useStore = create<GameStore>((set) => ({
  player: "",
  auth: false,
  playersData: [
    { id: 1, name: "me", points: null, multiplier: null, score: null },
    { id: 2, name: "CPU 1", points: null, multiplier: null, score: null },
    { id: 3, name: "CPU 2", points: null, multiplier: null, score: null },
    { id: 4, name: "CPU 3", points: null, multiplier: null, score: null },
    { id: 5, name: "CPU 4", points: null, multiplier: null, score: null },
  ],
  points: 50,
  multiplier: 0,
  PlayersMultipliers: [],
  StoppedAt: null,
  speed: 1,
  started: false,
  end: null,
  onGoing: false,
  startingPoints: 1000,

  addPlayer: (player) =>
    set((state) => ({ playersData: [...state.playersData, player] })),

  updatePlayer: (id, newData) =>
    set((state) => ({
      playersData: state.playersData.map((player) =>
        player.id === id ? { ...player, ...newData } : player
      ),
    })),

  resetPlayers: () =>
    set({
      playersData: [
        { id: 1, name: "me", points: null, multiplier: null, score: null },
        { id: 2, name: "you", points: null, multiplier: null, score: null },
        { id: 3, name: "you", points: null, multiplier: null, score: null },
        { id: 4, name: "you", points: null, multiplier: null, score: null },
        { id: 5, name: "you", points: null, multiplier: null, score: null },
      ],
      points: 0,
      multiplier: 0,
      PlayersMultipliers: [],
      StoppedAt: null,
      speed: 0,
      started: false,
      end: null,
    }),

  initializePlayers: (points, multiplier) =>
    set((state) => ({
      playersData: state.playersData.map((player) => {
        if (player.id === 1) {
          return { ...player, points, multiplier };
        } else {
          const { randomPoints, randomMultiplier } = getRandomValues();
          return {
            ...player,
            points: randomPoints,
            multiplier: parseFloat(randomMultiplier),
          };
        }
      }),
      points,
      multiplier,
    })),

  updatePlayerScores: (stoppedAt: number) =>
    set((state) => ({
      playersData: state.playersData.map((player) => ({
        ...player,
        score:
          stoppedAt > (player.multiplier || 0) && player.points !== null
            ? Math.round(player.multiplier! * player.points!) // Ensure score is a number
            : null, // Return null if the condition is not met
      })),
      StoppedAt: stoppedAt,
    })),

  setPoints: (points: string | number) => {
    // Convert to number if it's a string, otherwise use as is
    const numericPoints =
      typeof points === "string" ? parseFloat(points) : points;

    // Check if the numericPoints is a valid number
    if (!isNaN(numericPoints)) {
      set({ points: numericPoints });
    } else {
      // Optionally handle invalid input
      console.warn("Invalid points value. It should be a number.");
      // You could set to a default value or do nothing
      // set({ points: 0 }); // Uncomment to set a default value
    }
  },

  setSpeed: (speed) => set({ speed }),
  setMultiplier: (multiplier: string | number) => {
    // Convert to number if it's a string, otherwise use as is
    const numericMultiplier =
      typeof multiplier === "string" ? parseFloat(multiplier) : multiplier;

    // Check if the numericMultiplier is a valid number
    if (!isNaN(numericMultiplier)) {
      set({ multiplier: numericMultiplier });
    } else {
      // Optionally handle invalid input
      console.warn("Invalid multiplier value. It should be a number.");
      // You could set to a default value or do nothing
      // set({ multiplier: 0 }); // Uncomment to set a default value
    }
  },
  setPlayersMultiplier: (PlayersMultipliers) => set({ PlayersMultipliers }),
  setStoppedAt: (StoppedAt) => set({ StoppedAt }),
  setStartingPoints: (startingPoints) =>
    set((state) => ({
      startingPoints:
        startingPoints !== state.startingPoints
          ? startingPoints
          : state.startingPoints,
    })),
  setPlayer: (player) => set({ player }),
  setAuth: (auth) => set({ auth }),

  startGame: () => set({ started: true, end: false }),
  endGame: () => set({ end: true }),

  setGameState: (started, end) =>
    set((state) => ({
      started,
      end,
      onGoing: started && !end,
    })),

  resetGame: () =>
    set((state) => ({
      ...state,
      started: false,
      end: false,
      StoppedAt: null,
      playersData: state.playersData.map((player) => ({
        ...player,
        points: null,
        multiplier: null,
        score: null,
      })),
    })),
}));

export default useStore;
