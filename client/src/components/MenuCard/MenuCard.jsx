const MenuCard = ({ item, onItemClick, onOrderClick, className = "" }) => {
  return (
    <div
      className={`card bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-shadow w-full flex-shrink-0 rounded-t-lg rounded-b-none ${className}`}
      onClick={() => onItemClick?.(item)}
    >
      {/* Card image section: relative container for absolute badge positioning. */}
      <figure className="relative">
        {/* Responsive image height, object-fit, and rounded top corners */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover rounded-t-lg"
        />
        {/* Show NEW badge if item.isNew */}
        {item.isNew && (
          <div className="badge badge-neutral absolute top-2 left-2 sm:top-4 sm:left-4 font-bold text-xs sm:text-sm">
            NEW
          </div>
        )}
      </figure>

      {/* Card body: title, description, divider, and order button. */}
      <div className="card-body p-2 sm:p-2.5">
        {/* Responsive padding. Title uses custom font and responsive sizing. */}
        <h2 className="card-title text-base sm:text-lg md:text-xl font-stardos-stencil-bold">
          {item.title}
        </h2>
        {/* Description is clamped to 2 lines and styled for readability. */}
        <p className="text-base-content/70 text-xs sm:text-sm line-clamp-2 text-left font-stardos-stencil-normal">
          {item.description}
        </p>

        {/* Divider visually separates content from the action area. */}
        <div className="divider my-1"></div>

        {/* Order button uses daisyUI btn classes, is wide, and has a shopping bag icon. */}
        <div className="card-actions justify-center">
          <button
            className="btn btn-xs sm:btn-sm btn-wide bg-transparent border-none text-base-content font-stardos-stencil-bold hover:bg-transparent rounded-none text-xs sm:text-sm md:text-base"
            onClick={(e) => {
              e.stopPropagation(); // Prevents card click from firing when button is clicked
              onOrderClick?.(item);
            }}
          >
            <i className="bi bi-bag-fill text-primary text-xs sm:text-sm md:text-base"></i>
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
