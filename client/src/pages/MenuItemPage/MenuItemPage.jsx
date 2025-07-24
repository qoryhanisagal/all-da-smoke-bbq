import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { heroBackgrounds } from '../../data/backgroundImages';

// Mock data for menu items (this would typically come from an API)
const menuItemsData = {
  'bbq-sandwiches': {
    'beef-brisket': {
      name: 'Beef Brisket Sandwich',
      description: 'Our signature beef brisket is smoked low and slow for 14 hours using hickory wood. The result is incredibly tender, juicy meat with a perfect smoke ring. Served on a fresh brioche bun with pickles and onions.',
      longDescription: 'Our beef brisket is the crown jewel of our BBQ menu. We start with premium beef brisket, season it with our secret dry rub blend of spices, and smoke it at 225°F for 14 hours using hickory wood. The meat develops a beautiful bark while staying incredibly moist and tender inside. Each sandwich is hand-carved to order and piled high on a fresh brioche bun.',
      price: 12.99,
      image: 'https://picsum.photos/600/400?random=1',
      gallery: [
        'https://picsum.photos/600/400?random=1',
        'https://picsum.photos/600/400?random=11',
        'https://picsum.photos/600/400?random=21'
      ],
      nutrition: {
        calories: 650,
        protein: '45g',
        carbs: '35g',
        fat: '32g'
      },
      ingredients: ['Smoked Beef Brisket', 'Brioche Bun', 'Pickles', 'Red Onions', 'BBQ Sauce'],
      customizations: {
        sizes: [
          { name: 'Regular', price: 0 },
          { name: 'Large (+50% meat)', price: 4.00 }
        ],
        sauces: [
          { name: 'Original BBQ', price: 0 },
          { name: 'Spicy BBQ', price: 0 },
          { name: 'Carolina Gold', price: 0 },
          { name: 'Dry Rub (No Sauce)', price: 0 }
        ],
        sides: [
          { name: 'No Side', price: 0 },
          { name: 'Mac & Cheese', price: 2.99 },
          { name: 'Coleslaw', price: 2.49 },
          { name: 'Baked Beans', price: 2.99 },
          { name: 'Fries', price: 3.49 }
        ]
      }
    },
    'pulled-pork': {
      name: 'Pulled Pork Sandwich',
      description: 'Tender pork shoulder smoked for 12 hours and hand-pulled to perfection.',
      longDescription: 'Our pulled pork starts with premium pork shoulder, rubbed with our signature spice blend and smoked low and slow for 12 hours. The meat is then hand-pulled to maintain the perfect texture.',
      price: 11.99,
      image: 'https://picsum.photos/600/400?random=2',
      gallery: [
        'https://picsum.photos/600/400?random=2',
        'https://picsum.photos/600/400?random=12',
        'https://picsum.photos/600/400?random=22'
      ],
      nutrition: {
        calories: 580,
        protein: '38g',
        carbs: '34g',
        fat: '28g'
      },
      ingredients: ['Smoked Pulled Pork', 'Brioche Bun', 'Coleslaw', 'BBQ Sauce'],
      customizations: {
        sizes: [
          { name: 'Regular', price: 0 },
          { name: 'Large (+50% meat)', price: 3.50 }
        ],
        sauces: [
          { name: 'Original BBQ', price: 0 },
          { name: 'Spicy BBQ', price: 0 },
          { name: 'Carolina Gold', price: 0 }
        ],
        sides: [
          { name: 'No Side', price: 0 },
          { name: 'Mac & Cheese', price: 2.99 },
          { name: 'Coleslaw', price: 2.49 },
          { name: 'Baked Beans', price: 2.99 }
        ]
      }
    }
  }
};

export default function MenuItemPage() {
  const { category, item } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState(0);
  const [selectedSide, setSelectedSide] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const itemData = menuItemsData[category]?.[item];

  if (!itemData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle text-6xl text-warning mb-4"></i>
          <h1 className="text-4xl font-bold mb-4">Item Not Found</h1>
          <p className="text-lg text-base-content/70 mb-6">The menu item you're looking for doesn't exist.</p>
          <Link to="/menu" className="btn btn-primary">
            <i className="bi bi-arrow-left mr-2"></i>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    let total = itemData.price;
    if (itemData.customizations.sizes) {
      total += itemData.customizations.sizes[selectedSize]?.price || 0;
    }
    if (itemData.customizations.sides) {
      total += itemData.customizations.sides[selectedSide]?.price || 0;
    }
    return total * quantity;
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'bi-house' },
    { label: 'Menu', href: '/menu', icon: 'bi-list-ul' },
    { 
      label: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()), 
      href: `/menu/${category}`, 
      icon: 'bi-tag' 
    },
    { label: itemData.name, icon: 'bi-bookmark' }
  ];

  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero3}
        heroTitle={itemData.name}
        heroSubtitle={itemData.description}
      >
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="mb-4">
                <img 
                  src={itemData.gallery[selectedImage]} 
                  alt={itemData.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {itemData.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${itemData.name} ${index + 1}`}
                    className={`w-full h-24 object-cover rounded cursor-pointer transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Item Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{itemData.name}</h1>
              <p className="text-lg text-base-content/70 mb-6">{itemData.longDescription}</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-primary">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
                {calculateTotalPrice() !== itemData.price && (
                  <span className="text-lg text-base-content/50 line-through">
                    ${itemData.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Customizations */}
              <div className="space-y-6 mb-8">
                {/* Size Selection */}
                {itemData.customizations.sizes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Size</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {itemData.customizations.sizes.map((size, index) => (
                        <label key={index} className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            value={index}
                            checked={selectedSize === index}
                            onChange={() => setSelectedSize(index)}
                            className="sr-only"
                          />
                          <div className={`border-2 rounded-lg p-3 text-center transition-all ${
                            selectedSize === index 
                              ? 'border-primary bg-primary/10' 
                              : 'border-base-300 hover:border-primary/50'
                          }`}>
                            <div className="font-medium">{size.name}</div>
                            {size.price > 0 && (
                              <div className="text-sm text-primary">+${size.price.toFixed(2)}</div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sauce Selection */}
                {itemData.customizations.sauces && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Sauce</h3>
                    <select 
                      className="select select-bordered w-full"
                      value={selectedSauce}
                      onChange={(e) => setSelectedSauce(parseInt(e.target.value))}
                    >
                      {itemData.customizations.sauces.map((sauce, index) => (
                        <option key={index} value={index}>
                          {sauce.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Side Selection */}
                {itemData.customizations.sides && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Add a Side</h3>
                    <select 
                      className="select select-bordered w-full"
                      value={selectedSide}
                      onChange={(e) => setSelectedSide(parseInt(e.target.value))}
                    >
                      {itemData.customizations.sides.map((side, index) => (
                        <option key={index} value={index}>
                          {side.name} {side.price > 0 && `(+$${side.price.toFixed(2)})`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="btn btn-primary btn-lg w-full mb-6">
                <i className="bi bi-cart-plus mr-2"></i>
                Add to Cart - ${calculateTotalPrice().toFixed(2)}
              </button>

              {/* Nutrition Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Calories: <strong>{itemData.nutrition.calories}</strong></div>
                    <div>Protein: <strong>{itemData.nutrition.protein}</strong></div>
                    <div>Carbs: <strong>{itemData.nutrition.carbs}</strong></div>
                    <div>Fat: <strong>{itemData.nutrition.fat}</strong></div>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {itemData.ingredients.map((ingredient, index) => (
                    <span key={index} className="badge badge-outline">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-16">
            <Link to={`/menu/${category}`} className="btn btn-outline btn-lg">
              <i className="bi bi-caret-left-fill mr-2"></i>
              Back to {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}