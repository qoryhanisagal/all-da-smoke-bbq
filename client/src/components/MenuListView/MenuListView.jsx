export default function MenuListView({ items, onItemClick, onOrderClick }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      {items.map((item, index) => (
        <div key={item.id || index} className="flex gap-4 group">
          {/* Square Image */}
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={
                item.image ||
                item.gallery?.[0] ||
                'https://picsum.photos/300/300?random=' + index
              }
              alt={item.name || item.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onItemClick && onItemClick(item)}
            />
          </div>

          {/* Content - Left aligned */}
          <div className="flex-1 min-w-0 text-left">
            <h3
              className="text-lg font-bold text-base-content mb-2 cursor-pointer hover:text-primary transition-colors line-clamp-1 text-left"
              onClick={() => onItemClick && onItemClick(item)}
            >
              {item.name || item.title}
            </h3>
            <p className="text-base-content/70 text-sm mb-3 line-clamp-2 leading-relaxed text-left">
              {item.description || item.longDescription}
            </p>
            <button
              className="text-red-600 font-bold text-sm uppercase tracking-wider hover:text-red-700 transition-colors text-left"
              onClick={() => onOrderClick && onOrderClick(item)}
            >
              ORDER NOW
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
