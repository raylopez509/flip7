import { useRef } from "react";

export default function AddPlayerModal({ onClose, handleAddNewPlayer }) {
  const playerNameRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const playerName = playerNameRef.current.value;
    handleAddNewPlayer(playerName);
    onClose();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          ref={playerNameRef}
          placeholder="Enter the player's name"
        ></input>
        <button type="submit">Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
