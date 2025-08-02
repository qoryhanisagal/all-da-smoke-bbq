import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeroBreadcrumb from '../../components/HeroBreadcrumb/HeroBreadcrumb';
import LoadingSpinner from '../../components/LoadingSpinner';
import SidekicksCarousel from '../../components/SidekicksCarousel';
import SaucesCarousel from '../../components/SaucesCarousel';
import DrinksGrid from '../../components/DrinksGrid';
import PaginationDots from '../../components/PaginationDots';
import DecorativeDots from '../../components/DecorativeDots';
import { useFirebaseMenu } from '../../hooks/useFirebaseMenu';
import { useCart } from '../../context/CartContext';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function MenuItemPage() {
  const { category, item } = useParams();
  const { loading, error, getMenuItem } = useFirebaseMenu();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState(0);
  const [selectedSide, setSelectedSide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const itemData = getMenuItem(category, item);

  if (loading) {
    return <LoadingSpinner message="Loading Menu Item..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-error">
            Error Loading Menu Item
          </h2>
          <p className="text-base-content/70">{error}</p>
        </div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle text-6xl text-warning mb-4"></i>
          <h1 className="text-4xl font-bold mb-4">Item Not Found</h1>
          <p className="text-lg text-base-content/70 mb-6">
            The menu item you're looking for doesn't exist.
          </p>
          <Link to="/menu" className="btn btn-primary">
            <i className="bi bi-arrow-left mr-2"></i>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    // Parse price if it's a string (e.g., "$12.99")
    let basePrice =
      typeof itemData.price === 'string'
        ? parseFloat(itemData.price.replace('$', ''))
        : itemData.price;

    let total = basePrice || 0;

    if (itemData.customizations?.sizes) {
      total += itemData.customizations?.sizes[selectedSize]?.price || 0;
    }
    if (itemData.customizations?.sides) {
      total += itemData.customizations?.sides[selectedSide]?.price || 0;
    }
    return total * quantity;
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);

    try {
      const customizations = {};

      if (
        itemData.customizations?.sizes &&
        itemData.customizations?.sizes[selectedSize]
      ) {
        customizations.size = itemData.customizations.sizes[selectedSize].name;
      }

      if (
        itemData.customizations?.sauces &&
        itemData.customizations?.sauces[selectedSauce]
      ) {
        customizations.sauce =
          itemData.customizations.sauces[selectedSauce].name;
      }

      if (
        itemData.customizations?.sides &&
        itemData.customizations?.sides[selectedSide]
      ) {
        customizations.side = itemData.customizations.sides[selectedSide].name;
      }

      const cartItem = {
        id: itemData.id,
        name: itemData.name,
        description: itemData.description,
        image: itemData.image,
        price: calculateTotalPrice() / quantity, // Unit price with customizations
        category: itemData.category,
      };

      addToCart(cartItem, quantity, customizations);

      // Success feedback
      const btn = document.querySelector('.add-to-cart-btn');
      if (btn) {
        btn.textContent = 'Added to Cart!';
        btn.classList.add('btn-success');
        setTimeout(() => {
          btn.textContent = `Add to Cart - $${calculateTotalPrice().toFixed(2)}`;
          btn.classList.remove('btn-success');
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'bi-house' },
    { label: 'Menu', href: '/menu', icon: 'bi-list-ul' },
    {
      label: category
        .replace('-', ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      href: `/menu/${category}`,
      icon: 'bi-tag',
    },
    { label: itemData.name, icon: 'bi-bookmark' },
  ];

  // Debug: Log the image data
  console.log('MenuItemPage Debug:', {
    itemName: itemData.name,
    itemImage: itemData.image,
    gallery: itemData.gallery,
    selectedImage,
    featuredImageUrl: itemData.gallery?.[selectedImage] || itemData.image,
  });

  return (
    <div className="relative">
      <HeroBreadcrumb items={breadcrumbItems} theme="dark" />

      {/* Custom Hero Section for Menu Item */}
      <div
        className="hero min-h-96 relative"
        style={{
          backgroundImage: `url(${heroBackgrounds.hero5})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Hero overlay for better text readability */}
        <div className="hero-overlay bg-opacity-20"></div>

        {/* Hero content positioned absolutely */}
        <div className="absolute inset-0 flex items-start lg:items-center text-white pt-8 lg:pt-0">
          <div className="w-full px-8 lg:px-28">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12">
              {/* Left side - Text content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left relative">
                {/* Vertical decorative dots on the left */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex">
                  <DecorativeDots
                    count={8}
                    orientation="vertical"
                    size="sm"
                    color="text-accent"
                    spacing="gap-2"
                  />
                </div>
                {/* Menu item title */}
                <h1
                  className="text-accent font-stardos-stencil-bold text-3xl md:text-4xl lg:text-5xl mb-4"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {itemData.name}
                </h1>
                {/* Menu item description */}
                <p
                  className="text-accent-content text-base md:text-lg mb-6 max-w-lg mx-auto lg:mx-0"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                  {itemData.description}
                </p>
              </div>
              {/* Right side - No image here, it will hang outside */}
              <div className="lg:w-1/2">
                {/* Spacer to maintain layout balance */}
              </div>
            </div>
          </div>
        </div>

        {/* Hanging Featured Image - positioned absolutely to hang over hero section */}
        <div className="absolute right-4 sm:right-8 lg:right-16 -bottom-8 sm:-bottom-12 md:-bottom-16 z-20">
          <img
            src={itemData.gallery?.[selectedImage] || itemData.image}
            alt={itemData.name}
            className="w-64 h-48 sm:w-[32rem] sm:h-80 md:w-[40rem] md:h-96 object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-lg"
            onLoad={() => console.log('Hanging image loaded successfully')}
            onError={() => console.log('Hanging image failed to load')}
          />
        </div>

        {/* Pagination Dots - positioned on the left side horizontally */}
        {itemData.gallery && itemData.gallery.length > 1 && (
          <div className="absolute left-4 sm:left-8 lg:left-12 bottom-16 sm:bottom-8 md:bottom-4 z-30">
            <PaginationDots
              count={itemData.gallery.length}
              activeIndex={selectedImage}
              onDotClick={setSelectedImage}
              showOrientationToggle={false}
              defaultOrientation="horizontal"
              className=""
            />
          </div>
        )}
      </div>

      {/* Main content section */}
      <div className="min-h-screen bg-base-100">
        {/* Image Gallery Thumbnails with Pagination Dots */}
        {itemData.gallery && itemData.gallery.length > 1 && (
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-lg">
                {itemData.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${itemData.name} ${index + 1}`}
                    className={`w-full h-12 sm:h-14 md:h-16 object-cover rounded cursor-pointer transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-primary'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>

              {/* Pagination Dots with orientation toggle */}
              <PaginationDots
                count={itemData.gallery.length}
                activeIndex={selectedImage}
                onDotClick={setSelectedImage}
                showOrientationToggle={true}
                defaultOrientation="horizontal"
                className="mt-4"
              />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Item Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{itemData.name}</h1>
              <p className="text-lg text-base-content/70 mb-6">
                {itemData.longDescription}
              </p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-primary">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
                {calculateTotalPrice() !==
                  (typeof itemData.price === 'string'
                    ? parseFloat(itemData.price.replace('$', ''))
                    : itemData.price) && (
                  <span className="text-lg text-base-content/50 line-through">
                    {typeof itemData.price === 'string'
                      ? itemData.price
                      : `$${itemData.price?.toFixed(2)}`}
                  </span>
                )}
              </div>

              {/* Customizations */}
              <div className="space-y-6 mb-8">
                {/* Size Selection */}
                {itemData.customizations?.sizes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Size</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {itemData.customizations?.sizes.map((size, index) => (
                        <label key={index} className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            value={index}
                            checked={selectedSize === index}
                            onChange={() => setSelectedSize(index)}
                            className="sr-only"
                          />
                          <div
                            className={`border-2 rounded-lg p-3 text-center transition-all ${
                              selectedSize === index
                                ? 'border-primary bg-primary/10'
                                : 'border-base-300 hover:border-primary/50'
                            }`}
                          >
                            <div className="font-medium">{size.name}</div>
                            {size.price > 0 && (
                              <div className="text-sm text-primary">
                                +${size.price.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sauce Selection */}
                {itemData.customizations?.sauces && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Sauce</h3>
                    <select
                      className="select select-bordered w-full"
                      value={selectedSauce}
                      onChange={(e) =>
                        setSelectedSauce(parseInt(e.target.value))
                      }
                    >
                      {itemData.customizations?.sauces.map((sauce, index) => (
                        <option key={index} value={index}>
                          {sauce.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Side Selection */}
                {itemData.customizations?.sides && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Add a Side</h3>
                    <select
                      className="select select-bordered w-full"
                      value={selectedSide}
                      onChange={(e) =>
                        setSelectedSide(parseInt(e.target.value))
                      }
                    >
                      {itemData.customizations?.sides.map((side, index) => (
                        <option key={index} value={index}>
                          {side.name}{' '}
                          {side.price > 0 && `(+$${side.price.toFixed(2)})`}
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
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
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
              <button
                className="btn btn-primary btn-lg w-full mb-6 add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart-plus mr-2"></i>
                    Add to Cart - ${calculateTotalPrice().toFixed(2)}
                  </>
                )}
              </button>

              {/* Nutrition Info */}
              {itemData.nutrition && (
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title text-lg">
                      Nutrition Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {itemData.nutrition.calories && (
                        <div>
                          Calories:{' '}
                          <strong>{itemData.nutrition.calories}</strong>
                        </div>
                      )}
                      {itemData.nutrition.protein && (
                        <div>
                          Protein: <strong>{itemData.nutrition.protein}</strong>
                        </div>
                      )}
                      {itemData.nutrition.carbs && (
                        <div>
                          Carbs: <strong>{itemData.nutrition.carbs}</strong>
                        </div>
                      )}
                      {itemData.nutrition.fat && (
                        <div>
                          Fat: <strong>{itemData.nutrition.fat}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {itemData.ingredients && itemData.ingredients.length > 0 && (
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
              )}
            </div>
          </div>

          {/* Enhanced Menu Item Experience - Sonny's BBQ Style */}
          <div className="space-y-8 mt-16">
            {/* Sidekicks Section */}
            <SidekicksCarousel
              title="Add Sidekicks"
              collapsible={true}
              showPrices={true}
            />

            {/* Sauces Section */}
            <SaucesCarousel
              title="Take Home Our Signature Sauces"
              collapsible={true}
              showPrices={true}
            />

            {/* Drinks Section */}
            <DrinksGrid
              title="Complete Your Meal"
              collapsible={true}
              compact={true}
            />
          </div>

          {/* Back Button */}
          <div className="text-center mt-16">
            <Link to={`/menu/${category}`} className="btn btn-outline btn-lg">
              <i className="bi bi-caret-left-fill mr-2"></i>
              Back to{' '}
              {category
                .replace('-', ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
