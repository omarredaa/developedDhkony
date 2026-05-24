// "use client";
// import { useContext } from "react";
// import { PlayerContext } from "./learnContext"; // make sure this exports the provider

// type Player = { id: number; score: number; name: string };

// export default function Score() {
//   const context = useContext(PlayerContext);

//   if (!context) return null; // safety check in case provider is missing

//   const { state, dispatch } = context;

//   const handleIncrease = (playerId: number) => {
//     dispatch({ type: "Increase", id: playerId });
//   };

//   const handleDecrease = (playerId: number) => {
//     dispatch({ type: "Decrease", id: playerId });
//   };

//   return (
//     <div className="p-4">
//       {state.map((player: Player) => (
//         <div key={player.id} className="mb-3 p-2 border rounded">
//           <div className="text-black">Player ID: {player.id}</div>
//           <div>Player name: {player.name}</div>
//           <div>Player Score: {player.score}</div>
//           <div className="mt-2">
//             <button
//               className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
//               onClick={() => handleIncrease(player.id)}
//             >
//               +
//             </button>
//             <button
//               className="px-3 py-1 bg-red-500 text-white rounded"
//               onClick={() => handleDecrease(player.id)}
//             >
//               -
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import React, { useRef } from "react";
import { LearnContext } from "./learnContext";

export default function Page() {
  const data = LearnContext();
  const ref = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    ref.current?.focus();
  };
  return (
    <div>
      <div>
        your name is {data?.name} your id is {data?.id} your age is {data?.age}{" "}
        your college is {data?.college} your id is {data?.id}{" "}
      </div>
      <input
        ref={ref}
        type="text"
        name=""
        id=""
        className="rounded-3xl shadow-2xl border-4"
      />
      <button
        type="button"
        onClick={focusInput}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Focus on input
      </button>
    </div>
  );
}
