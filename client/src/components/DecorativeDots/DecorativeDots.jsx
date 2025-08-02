import { useState } from 'react';

export default function DecorativeDots({ 
  count = 20,
  orientation = 'horizontal', // 'horizontal' or 'vertical'
  size = 'sm', // 'sm', 'md', 'lg'
  color = 'text-accent',
  spacing = 'gap-1',
  showSwap = false,
  className = ""
}) {
  const [isVertical, setIsVertical] = useState(orientation === 'vertical');
  
  // Don't render anything if count is 0
  if (!count) return null;

  const handleOrientationToggle = () => {
    setIsVertical(!isVertical);
  };

  // Size mapping for Bootstrap Icons
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm', 
    lg: 'text-base'
  };

  const renderDots = () => {
    return Array.from({ length: count }).map((_, index) => (
      <i 
        key={index}
        className={`bi bi-circle-fill ${sizeClasses[size]} ${color}`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Decorative Dots Container */}
      <div 
        className={`flex ${spacing} ${
          isVertical ? 'flex-col' : 'flex-row'
        }`}
      >
        {renderDots()}
      </div>

      {/* Orientation Toggle using DaisyUI Swap */}
      {showSwap && (
        <label className="swap swap-rotate ml-2">
          <input 
            type="checkbox" 
            checked={isVertical}
            onChange={handleOrientationToggle}
          />
          
          {/* Horizontal Icon (when not checked) */}
          <div className="swap-off">
            <div className="tooltip tooltip-left" data-tip="Switch to vertical">
              <button className="btn btn-xs btn-ghost text-base-content/70 hover:text-primary">
                <i className="bi bi-three-dots text-sm"></i>
              </button>
            </div>
          </div>
          
          {/* Vertical Icon (when checked) */}
          <div className="swap-on">
            <div className="tooltip tooltip-left" data-tip="Switch to horizontal">
              <button className="btn btn-xs btn-ghost text-base-content/70 hover:text-primary">
                <i className="bi bi-three-dots-vertical text-sm"></i>
              </button>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}