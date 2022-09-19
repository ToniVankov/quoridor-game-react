import { GAME_TURN } from "../../constants";

export default function Status({ gameStatus, resetGame }) {
  const nextPlay =
    gameStatus.playersTurn == GAME_TURN.WHITE ? "White" : "Black";
  const wallsLeft =
    gameStatus.playersTurn == GAME_TURN.WHITE
      ? gameStatus.whiteWalls
      : gameStatus.blackWalls;
  const action = gameStatus.pawnSelected
    ? "Choose where to move the pawn!"
    : wallsLeft > 0
    ? "Select your pawn or place a wall!"
    : "Select your pawn!";

  return (
    <div className="gameStatus">
      {gameStatus.finished ? (
        <>
          <p>
            Game Finished!{" "}
            {gameStatus.winner == GAME_TURN.WHITE ? "White" : "Black"} WON!
          </p>
          <b>
            {" | "}
            <a href="" onClick={resetGame}>
              New Game
            </a>
            {" | "}
          </b>
        </>
      ) : (
        <b>
          <p className="statusPlayersTurn">Next play: {nextPlay}</p>
          <p className="statusWallLeft">Walls left: {wallsLeft}</p>
          {gameStatus.errorMsg.length ? (
            <p className="statusError">{gameStatus.errorMsg}</p>
          ) : (
            <p className="statusAction">{action}</p>
          )}
        </b>
      )}
    </div>
  );
}
