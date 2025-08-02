export default function SizeSelection({ sizes, selectedSize, onSizeChange }) {
  if (!sizes || sizes.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Size</h3>
      <div className="grid grid-cols-2 gap-2">
        {sizes.map((size, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="size"
              value={index}
              checked={selectedSize === index}
              onChange={() => onSizeChange(index)}
              className="sr-only"
            />
            <div
              className={`border-2 rounded-lg p-3 text-center transition-all ${
                selectedSize === index
                  ? 'border-primary bg-primary/10'
                  : 'border-base-300 hover:border-primary/50'
              }`}
            >
              <div className="font-medium">{size.name}</div>
              {size.price > 0 && (
                <div className="text-sm text-primary">
                  +${size.price.toFixed(2)}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}