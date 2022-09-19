import { SQUARES, CELL_STATUS } from "../constants";

function defaultObject(status) {
  return {
    status: status,
    walls: {
      onLeft: false,
      onRight: false,
      onTop: false,
      onBottom: false,
    },
  };
}

export const utils = {
  create2DarrayStates: () =>
    [...Array(SQUARES)].map((_, row) =>
      Array(SQUARES)
        .fill(0)
        .map((_, col) => {
          let status = CELL_STATUS.NOT_USED;
          if (!row && col == Math.floor(SQUARES / 2)) {
            status = CELL_STATUS.BLACK;
          }
          if (row == SQUARES - 1 && col == Math.floor(SQUARES / 2)) {
            status = CELL_STATUS.WHITE;
          }
          return new defaultObject(status);
        })
    ),

  clone: (arr) => JSON.parse(JSON.stringify(arr)),

  cloneAndSetAvailable: (states, id) => {
    const newstates = utils.clone(states);
    const [row, col] = utils.IDToPos(id);

    if (col < SQUARES - 1) {
      //right
      if (newstates[row][col + 1].status == CELL_STATUS.NOT_USED) {
        if (!newstates[row][col].walls.onRight) {
          newstates[row][col + 1].status = CELL_STATUS.AVAILABLE;
        }
      } else if (col < SQUARES - 2) {
        if (!newstates[row][col].walls.onRight) {
          if (!newstates[row][col + 1].walls.onRight) {
            //jump over opponent pawn
            newstates[row][col + 2].status = CELL_STATUS.AVAILABLE;
          } else {
            if (
              row &&
              !newstates[row][col].walls.onTop &&
              !newstates[row][col + 1].walls.onTop
            ) {
              newstates[row - 1][col + 1].status = CELL_STATUS.AVAILABLE;
            }
            if (
              row < SQUARES - 1 &&
              !newstates[row][col].walls.onBottom &&
              !newstates[row][col + 1].walls.onBottom
            ) {
              newstates[row + 1][col + 1].status = CELL_STATUS.AVAILABLE;
            }
          }
        }
      }
    }
    if (col > 0) {
      //left
      if (newstates[row][col - 1].status == CELL_STATUS.NOT_USED) {
        if (!newstates[row][col].walls.onLeft) {
          newstates[row][col - 1].status = CELL_STATUS.AVAILABLE;
        }
      } else if (col > 1) {
        if (!newstates[row][col].walls.onLeft) {
          if (!newstates[row][col - 1].walls.onLeft) {
            //jump over opponent pawn
            newstates[row][col - 2].status = CELL_STATUS.AVAILABLE;
          } else {
            if (
              row &&
              !newstates[row][col].walls.onTop &&
              !newstates[row][col - 1].walls.onTop
            ) {
              newstates[row - 1][col - 1].status = CELL_STATUS.AVAILABLE;
            }
            if (
              row < SQUARES - 1 &&
              !newstates[row][col].walls.onBottom &&
              !newstates[row][col - 1].walls.onBottom
            ) {
              newstates[row + 1][col - 1].status = CELL_STATUS.AVAILABLE;
            }
          }
        }
      }
    }
    if (row < SQUARES - 1) {
      //down
      if (newstates[row + 1][col].status == CELL_STATUS.NOT_USED) {
        if (!newstates[row][col].walls.onBottom) {
          newstates[row + 1][col].status = CELL_STATUS.AVAILABLE;
        }
      } else if (row < SQUARES - 2) {
        if (!newstates[row][col].walls.onBottom) {
          if (!newstates[row + 1][col].walls.onBottom) {
            //jump over opponent pawn
            newstates[row + 2][col].status = CELL_STATUS.AVAILABLE;
          } else {
            if (
              col &&
              !newstates[row][col].walls.onLeft &&
              !newstates[row + 1][col].walls.onLeft
            ) {
              newstates[row + 1][col - 1].status = CELL_STATUS.AVAILABLE;
            }
            if (
              col < SQUARES - 1 &&
              !newstates[row][col].walls.onRight &&
              !newstates[row + 1][col].walls.onRight
            ) {
              newstates[row + 1][col + 1].status = CELL_STATUS.AVAILABLE;
            }
          }
        }
      }
    }
    if (row > 0) {
      //up
      if (newstates[row - 1][col].status == CELL_STATUS.NOT_USED) {
        if (!newstates[row][col].walls.onTop) {
          newstates[row - 1][col].status = CELL_STATUS.AVAILABLE;
        }
      } else if (row > 1) {
        if (!newstates[row][col].walls.onTop) {
          if (!newstates[row - 1][col].walls.onTop) {
            //jump over opponent pawn
            newstates[row - 2][col].status = CELL_STATUS.AVAILABLE;
          } else {
            if (
              col &&
              !newstates[row][col].walls.onLeft &&
              !newstates[row - 1][col].walls.onLeft
            ) {
              newstates[row - 1][col - 1].status = CELL_STATUS.AVAILABLE;
            }
            if (
              col < SQUARES - 1 &&
              !newstates[row][col].walls.onRight &&
              !newstates[row - 1][col].walls.onRight
            ) {
              newstates[row - 1][col + 1].status = CELL_STATUS.AVAILABLE;
            }
          }
        }
      }
    }

    return newstates;
  },

  cloneAndClearAvailable: (states) => {
    const newstates = utils.clone(states);

    newstates.map((_el) => {
      _el.map((el, col) => {
        if (el.status == CELL_STATUS.AVAILABLE) {
          el.status = CELL_STATUS.NOT_USED;
        }
        return el;
      });
    });

    return newstates;
  },

  cloneAndSetPawnPosition: (states, id, nextPlay) => {
    const newstates = utils.clone(states);
    const [row, col] = utils.IDToPos(id);

    newstates.map((_el) => {
      _el.map((el, col) => {
        if (el.status == CELL_STATUS.AVAILABLE) {
          el.status = CELL_STATUS.NOT_USED;
        }
        if (el.status == nextPlay) {
          el.status = CELL_STATUS.NOT_USED;
        }
        return el;
      });
    });
    newstates[row][col].status = nextPlay;

    return newstates;
  },

  cloneAndSetNeighbours: (states, wallNeighbours) => {
    const newstates = utils.clone(states);
    wallNeighbours.map((el) => {
      const [row, col] = utils.IDToPos(el.id);
      newstates[row][col].walls[el.wall] = true;
    });

    return newstates;
  },

  posToID: (row, col) => {
    return (row + 1) * 10 + col + 1;
  },
  IDToPos: (id) => {
    const row = Math.floor(id / 10) - 1;
    const col = (id % 10) - 1;

    return [row, col];
  },

  getWallNeighbours: (row, col, vertical) => {
    //const [row, col] = utils.IDToPos(id);
    return vertical
      ? [
          { id: utils.posToID(row, col), wall: "onRight" },
          { id: utils.posToID(row, col + 1), wall: "onLeft" },
          { id: utils.posToID(row + 1, col), wall: "onRight" },
          { id: utils.posToID(row + 1, col + 1), wall: "onLeft" },
        ]
      : [
          { id: utils.posToID(row, col), wall: "onBottom" },
          { id: utils.posToID(row, col + 1), wall: "onBottom" },
          { id: utils.posToID(row + 1, col), wall: "onTop" },
          { id: utils.posToID(row + 1, col + 1), wall: "onTop" },
        ];
  },

  checkWallActive: (state, row, col, vertical) => {
    return vertical
      ? state[row][col].walls.onRight &&
          state[row][col + 1].walls.onLeft &&
          state[row + 1][col].walls.onRight &&
          state[row + 1][col + 1].walls.onLeft
      : state[row][col].walls.onBottom &&
          state[row][col + 1].walls.onBottom &&
          state[row + 1][col].walls.onTop &&
          state[row + 1][col + 1].walls.onTop;
  },

  checkWallUsable: (state, row, col, vertical) => {
    return vertical
      ? !state[row][col].walls.onRight &&
          !state[row + 1][col].walls.onRight &&
          (!state[row][col + 1].walls.onBottom ||
            !state[row][col].walls.onBottom)
      : !state[row][col].walls.onBottom &&
          !state[row][col + 1].walls.onBottom &&
          (!state[row + 1][col].walls.onRight ||
            !state[row][col].walls.onRight);
  },

  checkIfGameFinished: (states) => {
    let finished = false;
    states[0].map((el) => {
      if (el.status == CELL_STATUS.WHITE) {
        finished = true;
      }
    });

    states[SQUARES - 1].map((el) => {
      if (el.status == CELL_STATUS.BLACK) {
        finished = true;
      }
    });

    return finished;
  },

  checkIfWallBlocksReachingOppositeSide: (states) => {
    let whiteId, blackId;
    states.map((_el, row) => {
      _el.map((el, col) => {
        if (el.status == CELL_STATUS.WHITE) {
          whiteId = utils.posToID(row, col);
        }
        if (el.status == CELL_STATUS.BLACK) {
          blackId = utils.posToID(row, col);
        }
        return el;
      });
    });

    let visited = [...Array(SQUARES)].map((_, row) => Array(SQUARES).fill(0));
    if (!utils.pathIsAvailable(states, visited, whiteId, 0)) {
      return true;
    }
    visited = [...Array(SQUARES)].map((_, row) => Array(SQUARES).fill(0));
    if (!utils.pathIsAvailable(states, visited, blackId, SQUARES - 1)) {
      return true;
    }

    return false;
  },

  pathIsAvailable: (states, visited, id, rowToReach) => {
    const [row, col] = utils.IDToPos(id);
    if (row == rowToReach) return true;
    if (visited[row][col]) return false;

    visited[row][col] = true;

    if (row && !states[row][col].walls.onTop) {
      if (
        utils.pathIsAvailable(
          states,
          visited,
          utils.posToID(row - 1, col),
          rowToReach
        )
      ) {
        return true;
      }
    }

    if (col < SQUARES - 1 && !states[row][col].walls.onRight) {
      if (
        utils.pathIsAvailable(
          states,
          visited,
          utils.posToID(row, col + 1),
          rowToReach
        )
      ) {
        return true;
      }
    }

    if (row < SQUARES - 1 && !states[row][col].walls.onBottom) {
      if (
        utils.pathIsAvailable(
          states,
          visited,
          utils.posToID(row + 1, col),
          rowToReach
        )
      ) {
        return true;
      }
    }

    if (col && !states[row][col].walls.onLeft) {
      if (
        utils.pathIsAvailable(
          states,
          visited,
          utils.posToID(row, col - 1),
          rowToReach
        )
      ) {
        return true;
      }
    }

    return false;
  },
};
