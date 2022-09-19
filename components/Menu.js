import { useState } from "react";
import { WALLS_PER_PLAYER } from "../constants";

export default function Menu() {
  const [showRules, setShowRules] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    setShowRules(!showRules);
  }

  return (
    <>
      <div className="gameMenu">
        <h1>QUORIDOR</h1>
        <div>
          <b>
            <a href="" onClick={handleClick}>
              Rules
            </a>
            {" | "}
            <a
              href="https://www.google.com/search?q=quoridor+board+game"
              target="_blank"
            >
              More info
            </a>
          </b>
        </div>

        <div
          style={{
            transition:
              "height 0.5s ease 0s, visibility 0.2s ease 0s, opacity 0.2s ease 0s",
            width: "550px",
            height: showRules ? "160px" : "0",
            visibility: showRules ? "visible" : "hidden",
            opacity: showRules ? "1" : "0",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              display: "contents",
            }}
          >
            The main objective of the game is to get your pawn to the opposite
            side.
          </p>
          <p
            style={{
              display: "contents",
            }}
          >
            You may either move your pawn one square forward, backwards, right
            or left or you may place a wall between squares. Can not make move
            through the walls. Each player can place maximum of{" "}
            {WALLS_PER_PLAYER} walls. If your opponent is right next to you, you
            can jump over them. When click on your pawn the available positions
            where you can move will be colored. The game ends when the opposite
            side is reached.
          </p>
        </div>
      </div>
    </>
  );
}
