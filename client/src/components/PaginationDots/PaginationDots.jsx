import { useState } from 'react';

export default function PaginationDots({ 
  count, 
  activeIndex = 0, 
  onDotClick,
  showOrientationToggle = true,
  defaultOrientation = 'horizontal', // 'horizontal' or 'vertical'
  className = ""
}) {
  const [isVertical, setIsVertical] = useState(defaultOrientation === 'vertical');
  
  // Don't render anything if count is less than 2 (no need for pagination)
  if (!count || count < 2) return null;

  const handleOrientationToggle = () => {
    setIsVertical(!isVertical);
  };

  const renderDots = () => {
    return Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        type="button"
        aria-label={`Go to slide ${index + 1}`}
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          index === activeIndex
            ? 'bg-primary scale-110' // Active dot: filled with primary color and slightly larger
            : 'bg-base-300 hover:bg-primary/50' // Inactive dots: base color with hover effect
        }`}
        onClick={() => onDotClick?.(index)} // Call onDotClick callback with dot index when clicked
      />
    ));
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-4 ${className}`}>
      {/* Pagination Dots Container */}
      <div 
        className={`flex gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-base-100/80 backdrop-blur-sm shadow-lg ${
          isVertical ? 'flex-col' : 'flex-row'
        }`}
      >
        {renderDots()}
      </div>

      {/* Orientation Toggle using DaisyUI Swap */}
      {showOrientationToggle && (
        <label className="swap swap-rotate">
          <input 
            type="checkbox" 
            checked={isVertical}
            onChange={handleOrientationToggle}
          />
          
          {/* Horizontal Icon (when not checked) */}
          <div className="swap-off">
            <div className="tooltip tooltip-left" data-tip="Switch to vertical">
              <button className="btn btn-xs sm:btn-sm btn-ghost text-base-content/70 hover:text-primary">
                <i className="bi bi-three-dots text-sm sm:text-lg"></i>
              </button>
            </div>
          </div>
          
          {/* Vertical Icon (when checked) */}
          <div className="swap-on">
            <div className="tooltip tooltip-left" data-tip="Switch to horizontal">
              <button className="btn btn-xs sm:btn-sm btn-ghost text-base-content/70 hover:text-primary">
                <i className="bi bi-three-dots-vertical text-sm sm:text-lg"></i>
              </button>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
