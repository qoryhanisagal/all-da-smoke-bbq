export default function NutritionInfo({ nutrition }) {
  if (!nutrition) {
    return (
      <p className="text-base-content/70 mb-4">
        Nutrition information not available for this item.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {nutrition.calories && (
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {nutrition.calories}
          </div>
          <div className="text-sm">Calories</div>
        </div>
      )}
      {nutrition.protein && (
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {nutrition.protein}
          </div>
          <div className="text-sm">Protein</div>
        </div>
      )}
      {nutrition.carbs && (
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {nutrition.carbs}
          </div>
          <div className="text-sm">Carbs</div>
        </div>
      )}
      {nutrition.fat && (
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {nutrition.fat}
          </div>
          <div className="text-sm">Fat</div>
        </div>
      )}
    </div>
  );
}