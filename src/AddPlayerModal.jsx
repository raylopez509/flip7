import { useRef } from "react";

export default function AddPlayerModal({ onClose, handleAddNewPlayer }) {
 
  const playerNameRef = useRef(null);
  const handleConfirm = () => {
    const playerName = playerNameRef.current.value;
    handleAddNewPlayer(playerName);
    onClose();
  }
  return (
    <div>
      <input
        type="text"
        ref={playerNameRef}
        placeholder="Enter the player's name"
      ></input>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}