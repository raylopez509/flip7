import { useState } from "react";
import { createPortal } from "react-dom";
import ScoreboardModal from "./ScoreboardModal.jsx";
export default function ScoreboardButton({
  getRoundsArray,
  getAllPlayerRoundScores,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Scoreboard</button>
      {showModal &&
        createPortal(
          <ScoreboardModal
            onClose={() => setShowModal(false)}
            getRoundsArray={getRoundsArray}
            getAllPlayerRoundScores={getAllPlayerRoundScores}
          ></ScoreboardModal>,
          document.body,
        )}
    </>
  );
}
