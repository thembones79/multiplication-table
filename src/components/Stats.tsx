import { data } from "../data";
export const Stats = ({ onClose }: { onClose: () => void }) => {
  const stats = data.stats.get();
  const table = Object.entries(stats);
  const renderedBody = table
    .filter((row) => row[1] > 0)
    //@ts-ignore
    .sort((a, b) => b[1] - a[1])
    .map((row) => (
      <tr key={row[0]}>
        <td>{row[0]}</td>
        <td>{row[1]}</td>
      </tr>
    ));

  return (
    <div>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>Liczby</th>
            <th>Błędy</th>
          </tr>
        </thead>
        <tbody>{renderedBody}</tbody>
      </table>
      <button onClick={onClose}>Zamknij</button>
    </div>
  );
};
