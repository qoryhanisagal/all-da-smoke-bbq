import { useState } from 'react';
import { useCart } from '../../context/useCart';

const DrinksGrid = ({ title = "Complete Your Meal", collapsible = false, compact = true }) => {
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  const { addToCart } = useCart();

  // Drinks data - in production this would come from Firebase
  const drinks = [
    {
      id: 'sweet-tea',
      name: 'Sweet Tea',
      price: 2.50,
      description: 'Southern-style sweet tea brewed to perfection',
      image: 'https://picsum.photos/200/150?random=32',
      popular: true,
      category: 'Signature'
    },
    {
      id: 'lemonade',
      name: 'Fresh Lemonade', 
      price: 2.50,
      description: 'Fresh squeezed lemons with a hint of sweetness',
      image: 'https://picsum.photos/200/150?random=33',
      popular: true,
      category: 'Signature'
    },
    {
      id: 'cola',
      name: 'Cola',
      price: 2.00,
      description: 'Classic cola soft drink',
      image: 'https://picsum.photos/200/150?random=34',
      category: 'Soda'
    },
    {
      id: 'sprite',
      name: 'Lemon-Lime',
      price: 2.00,
      description: 'Refreshing lemon-lime soda',
      image: 'https://picsum.photos/200/150?random=35',
      category: 'Soda'
    },
    {
      id: 'dr-pepper',
      name: 'Dr. Pepper',
      price: 2.00,
      description: 'The unique taste of Dr. Pepper',
      image: 'https://picsum.photos/200/150?random=36',
      category: 'Soda'
    },
    {
      id: 'root-beer',
      name: 'Root Beer',
      price: 2.00,
      description: 'Classic root beer with vanilla finish',
      image: 'https://picsum.photos/200/150?random=37',
      category: 'Soda'
    }
  ];

  const handleAddToCart = (drink) => {
    const cartItem = {
      id: drink.id,
      name: drink.name,
      description: drink.description,
      image: drink.image,
      price: drink.price,
      category: 'BEVERAGES'
    };
    
    addToCart(cartItem, 1);
    
    // Visual feedback
    const button = document.querySelector(`[data-drink="${drink.id}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.classList.add('btn-success');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('btn-success');
      }, 1500);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full bg-base-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-base-content">{title}</h3>
        {collapsible && (
          <button 
            className="btn btn-ghost btn-sm"
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
          >
            <i className={`bi ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'} text-lg`}></i>
          </button>
        )}
      </div>

      {/* Collapsible Content */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        {/* Grid Container */}
        <div className={`${compact ? 'grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' : 'carousel carousel-center space-x-2 sm:space-x-3 md:space-x-4 p-3 sm:p-4 bg-base-200 rounded-box'}`}>
          {drinks.map((drink) => (
            <div key={drink.id} className={`${compact ? 'card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200 card-compact' : 'carousel-item flex-none card w-56 sm:w-60 md:w-64 bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200'}`}>
              {/* Image Container */}
              <figure className="relative">
                <img 
                  src={drink.image} 
                  alt={drink.name}
                  className={`w-full object-cover ${compact ? 'h-20' : 'h-32'}`}
                  loading="lazy"
                />
                {drink.popular && (
                  <div className={`badge badge-primary ${compact ? 'badge-xs' : 'badge-sm'} absolute top-${compact ? '1' : '2'} left-${compact ? '1' : '2'}`}>
                    Popular
                  </div>
                )}
              </figure>
              
              {/* Card Body */}
              <div className={`card-body ${compact ? 'p-3' : 'p-4'}`}>
                <h4 className={`card-title ${compact ? 'text-xs' : 'text-sm'} font-semibold leading-tight`}>
                  {drink.name}
                </h4>
                
                <p className={`text-xs text-base-content/70 ${compact ? 'line-clamp-1' : 'line-clamp-2'} mb-2`}>
                  {drink.description}
                </p>
                
                {/* Price and Action */}
                <div className={`card-actions ${compact ? 'flex-col items-stretch' : 'justify-between items-center'} mt-auto`}>
                  <span className={`font-bold text-primary ${compact ? 'text-sm text-center' : 'text-lg'}`}>
                    ${drink.price.toFixed(2)}
                  </span>
                  <button 
                    className={`btn btn-primary ${compact ? 'btn-xs w-full' : 'btn-sm'}`}
                    onClick={() => handleAddToCart(drink)}
                    data-drink={drink.id}
                  >
                    <i className={`bi bi-plus${compact ? '' : '-lg'} mr-1`}></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation hint */}
        {!compact && (
          <div className="text-center mt-2">
            <p className="text-xs text-base-content/50">← Scroll to see more →</p>
          </div>
        )}

        {/* Category Legend for Compact View */}
        {compact && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <div className="badge badge-outline badge-sm">
              <i className="bi bi-star-fill text-primary mr-1"></i>
              Popular
            </div>
            <div className="badge badge-outline badge-sm">
              <i className="bi bi-cup-straw mr-1"></i>
              Signature Drinks
            </div>
            <div className="badge badge-outline badge-sm">
              <i className="bi bi-cup mr-1"></i>
              Classic Sodas
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinksGrid;