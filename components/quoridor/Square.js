import { CELL_STATUS } from "../../constants";

export default function Square({ id, status, onPawnClick, onSquareClick }) {
  let [activeBlack, activeWhite] = [false, false];
  let className = "gameSquare";

  switch (status) {
    case CELL_STATUS.BLACK:
      activeBlack = true;
      break;
    case CELL_STATUS.WHITE:
      activeWhite = true;
      break;
    case CELL_STATUS.AVAILABLE:
      className += " gameSquareAvailable";
      break;
  }

  return (
    <div className={className} onClick={() => onSquareClick(id)}>
      {activeBlack && (
        <div className="gamePawnBlack" onClick={() => onPawnClick(id)}></div>
      )}
      {activeWhite && (
        <div className="gamePawnWhite" onClick={() => onPawnClick(id)}></div>
      )}
    </div>
  );
}
