export default function IngredientsDisplay({ ingredients }) {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">
        Ingredients
      </h4>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <span key={index} className="badge badge-outline">
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  );
}