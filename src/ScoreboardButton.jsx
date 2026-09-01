import { useState } from 'react';
import { createPortal } from 'react-dom';
import ScoreboardModal from './ScoreboardModal.jsx';
export default function ScoreboardButton({ showScoreBoard }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Scoreboard</button>
      {showModal &&
        createPortal(
          <ScoreboardModal
            onClose={() => setShowModal(false)}
            showScoreBoard={showScoreBoard}
          ></ScoreboardModal>,
          document.body,
        )}
    </>
  );
}
