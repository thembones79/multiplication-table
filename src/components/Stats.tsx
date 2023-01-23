export const Stats = ({ onClose }: { onClose: () => void }) => {
  return (
    <div>
      <div>Stats</div>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};
