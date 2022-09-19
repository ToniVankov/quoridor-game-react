export default function Wall({ vertical, last, onWallClick, active, usable }) {
  let className = vertical
    ? last
      ? "gameTempWall"
      : "gameWall"
    : "gameVerticalWall";
  if (active) {
    className += " gameWallActive";
  }
  if (usable) {
    className += " gameWallUsable";
  }
  return (
    <div className={className} onClick={usable ? onWallClick : null}></div>
  );
}
