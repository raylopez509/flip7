export default function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div>
      <div>{message}</div>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
