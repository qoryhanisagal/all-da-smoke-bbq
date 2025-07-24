export default function PaginationDots({ count, activeIndex = 0, onDotClick }) {
  // Don't render anything if count is less than 2 (no need for pagination)
  if (!count || count < 2) return null;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {/* Create array of dots based on count prop */}
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            index === activeIndex
              ? 'bg-primary' // Active dot: filled with primary color
              : 'bg-transparent border-2 border-primary/50' // Inactive dots: transparent with primary border
          }`}
          onClick={() => onDotClick?.(index)} // Call onDotClick callback with dot index when clicked
        />
      ))}
    </div>
  );
}
