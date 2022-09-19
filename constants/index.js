export const SQUARES = 9;
export const WALLS_PER_PLAYER = 7;

export const GAME_TURN = {
  WHITE: 1,
  BLACK: 2,
};

export const CELL_STATUS = {
  NOT_USED: 0,
  WHITE: GAME_TURN.WHITE,
  BLACK: GAME_TURN.BLACK,
  AVAILABLE: 3,
};

export const BORDERS = {
  LEFT: 0,
  RIGHT: 1,
  TOP: 2,
  BOTTOM: 3,
};
