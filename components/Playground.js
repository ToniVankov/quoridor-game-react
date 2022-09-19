import { Fragment, useState } from "react";
import uuid from "react-uuid";
import Quoridor from "./quoridor/Quoridor";

export default function Playground() {
  const [playgroundKey, setPlaygroundKey] = useState(uuid());

  return (
    <Fragment key={playgroundKey}>
      <Quoridor
        resetGame={(e) => {
          e.preventDefault();
          setPlaygroundKey(uuid());
        }}
      />
    </Fragment>
  );
}
