export default function SideSelection({ sides, selectedSide, onSideChange }) {
  if (!sides || sides.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Add a Side</h3>
      <select
        value={selectedSide}
        onChange={(e) => onSideChange(parseInt(e.target.value))}
        className="select select-bordered w-full"
      >
        {sides.map((side, index) => (
          <option key={index} value={index}>
            {side.name}
            {side.price > 0 && ` (+$${side.price.toFixed(2)})`}
          </option>
        ))}
      </select>
    </div>
  );
}