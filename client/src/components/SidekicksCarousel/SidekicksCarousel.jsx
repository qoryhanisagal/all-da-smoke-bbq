import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const SidekicksCarousel = ({ title = "Add Sidekicks", collapsible = false, showPrices = true }) => {
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  const { addToCart } = useCart();

  // Sidekicks data - in production this would come from Firebase
  const sidekicks = [
    {
      id: 'mac-cheese',
      name: 'Mac & Cheese',
      price: 3.50,
      description: 'Creamy macaroni infused with smoky flavors',
      image: 'https://picsum.photos/300/200?random=12',
      popular: true
    },
    {
      id: 'baked-beans',
      name: 'Baked Beans', 
      price: 3.50,
      description: 'BBQ beans slow-cooked with bacon',
      image: 'https://picsum.photos/300/200?random=13'
    },
    {
      id: 'collard-greens',
      name: 'Collard Greens',
      price: 3.50, 
      description: 'Simmered with onions, garlic and smoky goodness',
      image: 'https://picsum.photos/300/200?random=14'
    },
    {
      id: 'cole-slaw',
      name: 'Cole Slaw',
      price: 3.50,
      description: 'Crisp cabbage with creamy dressing',
      image: 'https://picsum.photos/300/200?random=15'
    },
    {
      id: 'green-beans',
      name: 'Green Beans',
      price: 3.50,
      description: 'Southern-style with onions and spices',
      image: 'https://picsum.photos/300/200?random=16'
    },
    {
      id: 'candied-yams',
      name: 'Candied Yams',
      price: 3.50,
      description: 'Baked with caramelized glaze and warm spices',
      image: 'https://picsum.photos/300/200?random=17'
    },
    {
      id: 'potato-salad',
      name: 'Potato Salad',
      price: 3.50,
      description: 'Tender potatoes with zesty dressing',
      image: 'https://picsum.photos/300/200?random=18'
    },
    {
      id: 'shoestring-fries',
      name: 'Shoestring Fries',
      price: 3.50,
      description: 'Crispy golden fries seasoned to perfection',
      image: 'https://picsum.photos/300/200?random=19'
    }
  ];

  const handleAddToCart = (sidekick) => {
    const cartItem = {
      id: sidekick.id,
      name: sidekick.name,
      description: sidekick.description,
      image: sidekick.image,
      price: sidekick.price,
      category: 'SIDEKICKS'
    };
    
    addToCart(cartItem, 1);
    
    // Visual feedback
    const button = document.querySelector(`[data-sidekick="${sidekick.id}"]`);
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
        {/* Carousel Container */}
        <div className="carousel carousel-center space-x-2 sm:space-x-3 md:space-x-4 p-3 sm:p-4 bg-base-200 rounded-box">
          {sidekicks.map((sidekick) => (
            <div key={sidekick.id} className="carousel-item flex-none">
              <div className="card w-56 sm:w-60 md:w-64 bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200">
                {/* Image Container */}
                <figure className="relative">
                  <img 
                    src={sidekick.image} 
                    alt={sidekick.name}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  {sidekick.popular && (
                    <div className="badge badge-primary badge-sm absolute top-2 left-2">
                      Popular
                    </div>
                  )}
                </figure>
                
                {/* Card Body */}
                <div className="card-body p-4">
                  <h4 className="card-title text-sm font-semibold">{sidekick.name}</h4>
                  <p className="text-xs text-base-content/70 line-clamp-2">{sidekick.description}</p>
                  
                  {/* Price and Action */}
                  <div className="card-actions justify-between items-center mt-3">
                    {showPrices && (
                      <span className="text-lg font-bold text-primary">
                        ${sidekick.price.toFixed(2)}
                      </span>
                    )}
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(sidekick)}
                      data-sidekick={sidekick.id}
                    >
                      <i className="bi bi-plus-lg mr-1"></i>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation hint for mobile */}
        <div className="text-center mt-2">
          <p className="text-xs text-base-content/50">← Scroll to see more →</p>
        </div>
      </div>
    </div>
  );
};

export default SidekicksCarousel;