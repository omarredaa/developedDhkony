// "use client";

// import React, { useReducer, createContext, useContext } from "react";

// // ----- Types -----
// type Player = {
//   id: number;
//   score: number;
//   name: string;
// };

// type Action = { type: "Increase" | "Decrease"; id: number };

// type ContextType = {
//   state: Player[];
//   dispatch: React.Dispatch<Action>;
// };

// // ----- Initial State -----
// const initialScore: Player[] = [
//   { id: 1, score: 0, name: "Omar" },
//   { id: 2, score: 0, name: "Reda" },
//   { id: 3, score: 0, name: "Mohamed" },
// ];

// // ----- Reducer -----
// const reducer = (state: Player[], action: Action): Player[] => {
//   switch (action.type) {
//     case "Increase":
//       return state.map((player) =>
//         player.id === action.id
//           ? { ...player, score: player.score + 1 }
//           : player,
//       );
//     case "Decrease":
//       return state.map((player) =>
//         player.id === action.id
//           ? { ...player, score: player.score - 1 }
//           : player,
//       );
//     default:
//       return state;
//   }
// };

// // ----- Context -----
// export const PlayerContext = createContext<ContextType | null>(null);

// // ----- Provider Component -----
// export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, initialScore);

//   return (
//     <PlayerContext.Provider value={{ state, dispatch }}>
//       {children}
//     </PlayerContext.Provider>
//   );
// };

// // ----- Component that consumes the context -----
// const PlayerList = () => {
//   const context = useContext(PlayerContext);

//   if (!context) return null; // safety check

//   const { state, dispatch } = context;

//   const handleIncrease = (id: number) => dispatch({ type: "Increase", id });
//   const handleDecrease = (id: number) => dispatch({ type: "Decrease", id });

//   return (
//     <div className="p-4">
//       {state.map((player) => (
//         <div key={player.id} className="mb-2">
//           <span className="mr-2">{player.name}</span>
//           <span className="mr-2">Score: {player.score}</span>
//           <button
//             className="mr-1 px-2 py-1 bg-green-500 text-white"
//             onClick={() => handleIncrease(player.id)}
//           >
//             +
//           </button>
//           <button
//             className="px-2 py-1 bg-red-500 text-white"
//             onClick={() => handleDecrease(player.id)}
//           >
//             -
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ----- Main Page -----
// export default function ScorePage() {
//   return (
//     <PlayerProvider>
//       <PlayerList />
//     </PlayerProvider>
//   );
"use client";

import React, { createContext, useEffect, useState } from "react";

type learnType = {
  id: number;
  name: string;
  age: number;
  college: string;
  isStudent: boolean;
};

// const intialState = {
//   id: 1,
//   player: "",
//   goals: 0,
// };

const learnContext = createContext<learnType | null>(null);

export default function LearnProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<learnType>({
    id: 1,
    name: "Omar",
    age: 20,
    college: "Engineering",
    isStudent: true,
  });

  useEffect(() => {
    const setTime = setTimeout(() => {
      setData((prev) => ({ ...prev, id: data.id + 1 }));
    }, 1000);
    clearTimeout(setTime);
  }, [data.id]);

  return <learnContext.Provider value={data}>{children}</learnContext.Provider>;
}

export const LearnContext = () => {
  const context = React.useContext(learnContext);
  if (!context) throw new Error("Context not found");
  return context;
};
