import { SQUARES } from "../../constants";
import { utils } from "../../utils";
import Square from "./Square";
import Wall from "./Wall";
import uuid from "react-uuid";
import { Fragment } from "react";

export default function RowGroup({
  row,
  onWallClick,
  onPawnClick,
  onSquareClick,
  states,
  enableWalls,
}) {
  const first = row == 0 ? true : false;
  const last = row == SQUARES - 1 ? true : false;

  let groupClass = "gameRowGroup" + (first ? "" : " gameRowGroupFix");

  return (
    <div className={groupClass}>
      {Array(SQUARES)
        .fill(0)
        .map((el, index) => {
          return (
            <Fragment key={uuid()}>
              <Square
                key={uuid()}
                id={utils.posToID(row, index)}
                status={states[row][index].status}
                onPawnClick={onPawnClick}
                onSquareClick={onSquareClick}
              />
              {index != SQUARES - 1 && (
                <Wall
                  key={uuid()}
                  vertical={true}
                  last={last}
                  onWallClick={() =>
                    onWallClick(utils.getWallNeighbours(row, index, true))
                  }
                  active={
                    !last && utils.checkWallActive(states, row, index, true)
                  }
                  usable={
                    enableWalls &&
                    !last &&
                    utils.checkWallUsable(states, row, index, true)
                  }
                />
              )}
            </Fragment>
          );
        })}

      {!last &&
        Array(SQUARES - 1)
          .fill(0)
          .map((el, index) => (
            <Wall
              key={uuid()}
              onWallClick={() =>
                onWallClick(utils.getWallNeighbours(row, index, false))
              }
              active={utils.checkWallActive(states, row, index, false)}
              usable={
                enableWalls && utils.checkWallUsable(states, row, index, false)
              }
            />
          ))}
    </div>
  );
}
