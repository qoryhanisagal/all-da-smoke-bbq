export default function SauceSelection({ sauces, selectedSauce, onSauceChange }) {
  if (!sauces || sauces.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Sauce</h3>
      <select
        value={selectedSauce}
        onChange={(e) => onSauceChange(parseInt(e.target.value))}
        className="select select-bordered w-full"
      >
        {sauces.map((sauce, index) => (
          <option key={index} value={index}>
            {sauce.name}
            {sauce.price > 0 && ` (+$${sauce.price.toFixed(2)})`}
          </option>
        ))}
      </select>
    </div>
  );
}