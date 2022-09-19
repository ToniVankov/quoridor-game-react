import Board from "./Board";
import Status from "./Status";
import { useState } from "react";
import { GAME_TURN, WALLS_PER_PLAYER } from "../../constants";

export default function Quoridor({ resetGame }) {
  const [gameStatus, setGameStatus] = useState({
    playersTurn: GAME_TURN.WHITE,
    whiteWalls: WALLS_PER_PLAYER,
    blackWalls: WALLS_PER_PLAYER,
    pawnSelected: false,
    finished: false,
    winner: "",
    errorMsg: "",
  });

  return (
    <>
      <Board gameStatus={gameStatus} setGameStatus={setGameStatus} />
      <Status gameStatus={gameStatus} resetGame={resetGame} />
    </>
  );
}
