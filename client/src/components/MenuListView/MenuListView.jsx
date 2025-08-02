export default function MenuListView({ items, onItemClick, onOrderClick }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id || index} className="bg-base-100 rounded-lg shadow-sm border border-base-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
              <img
                src={item.image || item.gallery?.[0] || 'https://picsum.photos/400/300?random=' + index}
                alt={item.name || item.title}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onItemClick && onItemClick(item)}
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 
                  className="text-lg font-bold text-base-content mb-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  {item.name || item.title}
                </h3>
                <p className="text-base-content/70 text-sm mb-3 line-clamp-2">
                  {item.description || item.longDescription}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary">
                  {typeof item.price === 'string' ? item.price : `$${item.price?.toFixed(2)}`}
                </div>
                <button
                  className="btn btn-primary btn-sm text-xs font-bold uppercase tracking-wider"
                  onClick={() => onOrderClick && onOrderClick(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}