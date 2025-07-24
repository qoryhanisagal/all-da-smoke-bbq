// Reusable carousel navigation arrows component
const CarouselArrows = ({ onPrevClick, onNextClick, className = "" }) => {
  return (
    <>
      {/* Previous arrow button - positioned outside carousel on the left */}
      <button
        className={`btn btn-circle btn-ghost absolute -left-12 top-1/2 -translate-y-1/2 z-10 text-3xl hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:ring-2 active:ring-primary ${className}`}
        onClick={onPrevClick}
        aria-label="Previous item"
      >
        <i className="bi bi-arrow-left-circle"></i>
      </button>

      {/* Next arrow button - positioned outside carousel on the right */}
      <button
        className={`btn btn-circle btn-ghost absolute -right-12 top-1/2 -translate-y-1/2 z-10 text-3xl hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:ring-2 active:ring-primary ${className}`}
        onClick={onNextClick}
        aria-label="Next item"
      >
        <i className="bi bi-arrow-right-circle"></i>
      </button>
    </>
  );
};

export default CarouselArrows;