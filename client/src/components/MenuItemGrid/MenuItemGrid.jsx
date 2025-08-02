import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const MenuItemGrid = ({ items, category }) => {
  const { addToCart } = useCart();

  // Generate item slug from item name/title (Firebase uses 'title' field)
  const getItemSlug = (item) => {
    const itemName = item.title || item.name; // Support both title and name fields
    return itemName ? itemName.toLowerCase().replace(/[^a-z0-9]/g, '-') : '';
  };

  const handleAddToCart = (item, e) => {
    e.preventDefault(); // Prevent navigation when adding to cart
    
    const cartItem = {
      id: getItemSlug(item),
      name: item.title || item.name,
      description: item.description,
      image: item.image,
      price: typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price,
      category: item.category
    };

    addToCart(cartItem, 1, {});
    
    // Success feedback for circular button
    const btn = e.target.closest('button');
    if (btn) {
      const originalIcon = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check text-xl"></i>';
      btn.classList.add('btn-success');
      setTimeout(() => {
        btn.innerHTML = originalIcon;
        btn.classList.remove('btn-success');
      }, 1500);
    }
  };
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16">
        <i className="bi bi-search text-6xl text-base-content/30 mb-4"></i>
        <h3 className="text-2xl font-bold mb-2">No Items Found</h3>
        <p className="text-base-content/70">This category doesn't have any items yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="card bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-lg group"
        >
          {/* Card image section */}
          <figure className="relative overflow-hidden rounded-t-lg">
            <img 
              src={item.image} 
              alt={item.title || item.name}
              className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Popular badge */}
            {item.popular && (
              <div className="badge badge-primary absolute top-2 left-2 font-bold text-xs opacity-90">
                <i className="bi bi-star-fill mr-1"></i>
                Popular
              </div>
            )}
            
            {/* Heat Level for Sauces */}
            {category === 'sauces-rubs' && item.heatLevel && (
              <div className="absolute top-2 right-2 bg-base-100/90 px-2 py-1 rounded flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <i 
                    key={i} 
                    className={`bi bi-fire ${i < item.heatLevel ? 'text-error' : 'text-base-300'} text-xs`}
                  ></i>
                ))}
              </div>
            )}
            
            {/* Category badge for beverages */}
            {category === 'beverages' && item.category && (
              <div className="badge badge-outline absolute top-2 right-2 text-xs bg-base-100/90">
                {item.category}
              </div>
            )}
            {/* Hover overlay with actions */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-4">
              <Link 
                to={`/menu/${category}/${getItemSlug(item)}`}
                className="btn btn-circle btn-lg bg-white bg-opacity-90 border-none text-black hover:bg-opacity-100 hover:scale-110 transition-all duration-200"
                title="View Details"
              >
                <i className="bi bi-eye text-xl"></i>
              </Link>
              <button 
                className="btn btn-circle btn-lg bg-primary bg-opacity-90 border-none text-white hover:bg-opacity-100 hover:scale-110 transition-all duration-200"
                onClick={(e) => handleAddToCart(item, e)}
                title="Add to Cart"
              >
                <i className="bi bi-bag text-xl"></i>
              </button>
            </div>
          </figure>
          
          {/* Card body - minimal like ImageGallery */}
          <div className="card-body p-4">
            <h3 className="card-title text-sm sm:text-base font-bold text-center mb-2">
              {item.title || item.name}
            </h3>
            
            {/* Brief description for enhanced categories */}
            {(category === 'sauces-rubs' || category === 'beverages' || category === 'sides') && item.description && (
              <p className="text-xs text-base-content/70 text-center mb-2 line-clamp-2">
                {item.description}
              </p>
            )}
            
            {/* Tags for sauces */}
            {category === 'sauces-rubs' && item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {item.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-center">
              <span className="text-lg font-bold text-primary">
                {typeof item.price === 'string' ? item.price : `$${item.price?.toFixed(2)}`}
              </span>
              {/* Size indicator for bottles */}
              {category === 'sauces-rubs' && (
                <div className="text-xs text-base-content/50 mt-1">16oz bottle</div>
              )}
              {/* Size options for drinks/sides */}
              {(category === 'beverages' || category === 'sides') && (
                <div className="text-xs text-base-content/50 mt-1">Multiple sizes available</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemGrid;