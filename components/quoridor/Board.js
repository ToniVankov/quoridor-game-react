import { useState } from "react";
import RowGroup from "./RowGroup";
import uuid from "react-uuid";
import { SQUARES, CELL_STATUS, GAME_TURN } from "../../constants";
import { utils } from "../../utils";

export default function Board({ gameStatus, setGameStatus }) {
  const [states, setStates] = useState(utils.create2DarrayStates());

  const whiteOnMove = gameStatus.playersTurn == GAME_TURN.WHITE;
  const wallsLeft = whiteOnMove ? gameStatus.whiteWalls : gameStatus.blackWalls;
  const enableWalls =
    wallsLeft && !gameStatus.pawnSelected && !gameStatus.finished;

  function onWallClick(wallNeighbours) {
    if (gameStatus.finished) {
      return;
    }
    if (0 == (whiteOnMove ? gameStatus.whiteWalls : gameStatus.blackWalls)) {
      return;
    }

    const newstates = utils.cloneAndSetNeighbours(states, wallNeighbours);

    if (utils.checkIfWallBlocksReachingOppositeSide(newstates)) {
      //players must always have a path available to the other side.
      setGameStatus({
        ...gameStatus,
        errorMsg: "This move is not allowed.",
      });
      return;
    }

    const playersTurn = whiteOnMove ? GAME_TURN.BLACK : GAME_TURN.WHITE;
    const whiteWalls = whiteOnMove
      ? gameStatus.whiteWalls - 1
      : gameStatus.whiteWalls;
    const blackWalls = whiteOnMove
      ? gameStatus.blackWalls
      : gameStatus.blackWalls - 1;

    setStates(newstates);
    setGameStatus({
      ...gameStatus,
      playersTurn,
      pawnSelected: false,
      whiteWalls,
      blackWalls,
      errorMsg: "",
    });
  }

  function onPawnClick(id) {
    if (gameStatus.finished) {
      return;
    }
    const [row, col] = utils.IDToPos(id);
    if (states[row][col].status != gameStatus.playersTurn) return;

    setStates(
      gameStatus.pawnSelected
        ? utils.cloneAndClearAvailable(states)
        : utils.cloneAndSetAvailable(states, id)
    );
    setGameStatus({
      ...gameStatus,
      pawnSelected: !gameStatus.pawnSelected,
      errorMsg: "",
    });
  }

  function onSquareClick(id) {
    if (gameStatus.finished) {
      return;
    }
    const [row, col] = utils.IDToPos(id);
    if (states[row][col].status != CELL_STATUS.AVAILABLE) return;

    const playersTurn = whiteOnMove ? GAME_TURN.BLACK : GAME_TURN.WHITE;
    const newstates = utils.cloneAndSetPawnPosition(
      states,
      id,
      gameStatus.playersTurn
    );
    const finished = utils.checkIfGameFinished(newstates);
    let winner = "";
    if (finished) {
      winner = gameStatus.playersTurn;
    }

    setStates(newstates);
    setGameStatus({
      ...gameStatus,
      playersTurn,
      finished,
      winner,
      pawnSelected: false,
      errorMsg: "",
    });
  }

  return (
    <div className="gameBoard">
      {Array(SQUARES)
        .fill(0)
        .map((el, index) => {
          return (
            <RowGroup
              key={uuid()}
              row={index}
              states={states}
              onWallClick={onWallClick}
              onPawnClick={onPawnClick}
              onSquareClick={onSquareClick}
              enableWalls={enableWalls}
            />
          );
        })}
    </div>
  );
}
