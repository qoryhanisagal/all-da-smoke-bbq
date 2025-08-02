import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const SaucesCarousel = ({ title = "Add Our Signature Sauces", collapsible = false, showPrices = true }) => {
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  const { addToCart } = useCart();

  // Sauces data - in production this would come from Firebase
  const sauces = [
    {
      id: 'original-bbq',
      name: 'Original BBQ',
      price: 8.00,
      description: 'Our timeless classic with rich, savory flavor and the perfect touch of tang',
      image: 'https://picsum.photos/300/200?random=22',
      popular: true,
      heatLevel: 1,
      tags: ['House Favorite', 'Classic']
    },
    {
      id: 'sweet-spicy',
      name: 'Sweet & Spicy',
      price: 8.00,
      description: 'Perfect balance of rich sweetness with a fiery kick that builds with each bite',
      image: 'https://picsum.photos/300/200?random=23',
      popular: true,
      heatLevel: 3,
      tags: ['Popular', 'Hot']
    },
    {
      id: 'peach-bourbon',
      name: 'Peach Bourbon',
      price: 8.00,
      description: 'Sweet juicy peaches meet warm, smoky bourbon notes in this sophisticated blend',
      image: 'https://picsum.photos/300/200?random=24',
      heatLevel: 2,
      tags: ['Premium', 'Fruity']
    },
    {
      id: 'carolina-gold',
      name: 'Carolina Gold',
      price: 8.00,
      description: 'Tangy and zesty Southern classic with distinctive mustard bite and balanced sweetness',
      image: 'https://picsum.photos/300/200?random=25',
      heatLevel: 2,
      tags: ['Traditional', 'Tangy']
    }
  ];

  const handleAddToCart = (sauce) => {
    const cartItem = {
      id: sauce.id,
      name: sauce.name,
      description: sauce.description,
      image: sauce.image,
      price: sauce.price,
      category: 'SAUCES & RUBS'
    };
    
    addToCart(cartItem, 1);
    
    // Visual feedback
    const button = document.querySelector(`[data-sauce="${sauce.id}"]`);
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

  const getHeatLevelIcons = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`bi bi-fire ${i < level ? 'text-error' : 'text-base-300'} text-xs`}
      ></i>
    ));
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
        {/* Carousel Container */}
        <div className="carousel carousel-center space-x-2 sm:space-x-3 md:space-x-4 p-3 sm:p-4 bg-base-200 rounded-box">
          {sauces.map((sauce) => (
            <div key={sauce.id} className="carousel-item flex-none">
              <div className="card w-64 sm:w-68 md:w-72 bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200">
                {/* Image Container */}
                <figure className="relative">
                  <img 
                    src={sauce.image} 
                    alt={sauce.name}
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                  {sauce.popular && (
                    <div className="badge badge-primary badge-sm absolute top-2 left-2">
                      Popular
                    </div>
                  )}
                  {/* Heat Level Indicator */}
                  <div className="absolute top-2 right-2 bg-base-100/90 px-2 py-1 rounded flex items-center space-x-1">
                    {getHeatLevelIcons(sauce.heatLevel)}
                  </div>
                </figure>
                
                {/* Card Body */}
                <div className="card-body p-4">
                  <h4 className="card-title text-sm font-semibold">{sauce.name}</h4>
                  <p className="text-xs text-base-content/70 line-clamp-3 mb-2">{sauce.description}</p>
                  
                  {/* Tags */}
                  {sauce.tags && sauce.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {sauce.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="badge badge-outline badge-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Price and Action */}
                  <div className="card-actions justify-between items-center mt-auto">
                    {showPrices && (
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary">
                          ${sauce.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-base-content/50">16oz bottle</span>
                      </div>
                    )}
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(sauce)}
                      data-sauce={sauce.id}
                    >
                      <i className="bi bi-cart-plus mr-1"></i>
                      Buy Bottle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation hint for mobile */}
        <div className="text-center mt-2">
          <p className="text-xs text-base-content/50">← Scroll to see more sauces →</p>
        </div>
      </div>
    </div>
  );
};

export default SaucesCarousel;