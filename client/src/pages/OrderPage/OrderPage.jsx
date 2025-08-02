import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import {
  heroBackgrounds,
  contentBackgrounds,
} from '../../data/backgroundImages';

export default function OrderPage() {
  const location = useLocation();
  const [orderType, setOrderType] = useState(location.state?.orderType || 'DELIVERY');
  const [itemName, setItemName] = useState(location.state?.itemName || '');

  useEffect(() => {
    if (location.state) {
      setOrderType(location.state.orderType || 'DELIVERY');
      setItemName(location.state.itemName || '');
    }
  }, [location]);

  // Dynamic content based on order type
  const getOrderContent = () => {
    switch (orderType) {
      case 'TAKEOUT':
        return {
          title: 'Order Takeout',
          subtitle: 'Skip the wait, order ahead for pickup!',
          icon: 'bi-bag',
          description: 'Place your takeout order and we\'ll have it ready for you to pick up at our location.'
        };
      case 'CURBSIDE':
        return {
          title: 'Curbside Pickup',
          subtitle: 'We\'ll bring your order right to your car!',
          icon: 'bi-car-front',
          description: 'Order ahead and stay in your car. We\'ll bring your fresh BBQ right out to you.'
        };
      case 'DELIVERY':
      default:
        return {
          title: 'Delivery',
          subtitle: 'Fresh BBQ delivered to your door!',
          icon: 'bi-truck',
          description: 'Get All Da Smoke BBQ delivered hot and fresh to your location.'
        };
    }
  };

  const content = getOrderContent();

  return (
    <div>
      <HeroLayout
        allowStacking={false}
        heroImage={heroBackgrounds.hero1}
        heroTitle={content.title}
        heroSubtitle={content.subtitle}
        contentBackgroundImage={contentBackgrounds.woodTexture}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Show selected item if coming from menu */}
          {itemName && (
            <div className="bg-base-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-lg mb-2 text-center">You selected:</p>
              <p className="text-2xl font-bold text-primary text-center">
                {itemName}
              </p>
            </div>
          )}

          {/* Coming Soon Notice */}
          <div className="text-center max-w-3xl mx-auto">
            <i className={`bi ${content.icon} text-6xl text-primary mb-6`}></i>
            
            <h2 className="text-3xl font-bold mb-4">Online Ordering Coming Soon!</h2>
            
            <p className="text-lg text-base-content/70 mb-8">
              {content.description}
            </p>

            <div className="bg-primary text-primary-content rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Call to Order</h3>
              <a href="tel:+1234567890" className="text-3xl font-bold hover:underline">
                <i className="bi bi-telephone-fill mr-3"></i>
                (123) 456-7890
              </a>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-base-200">
                <div className="card-body text-center">
                  <i className="bi bi-clock text-3xl text-primary mb-2"></i>
                  <h3 className="text-xl font-semibold mb-2">Hours</h3>
                  <p className="text-sm">Mon-Thu: 11am-9pm</p>
                  <p className="text-sm">Fri-Sat: 11am-10pm</p>
                  <p className="text-sm">Sun: 12pm-8pm</p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body text-center">
                  <i className="bi bi-geo-alt text-3xl text-primary mb-2"></i>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-sm">123 BBQ Street</p>
                  <p className="text-sm">Smokeville, TX 12345</p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body text-center">
                  <i className="bi bi-info-circle text-3xl text-primary mb-2"></i>
                  <h3 className="text-xl font-semibold mb-2">Order Info</h3>
                  {orderType === 'DELIVERY' && (
                    <>
                      <p className="text-sm">Min. order: $25</p>
                      <p className="text-sm">Delivery fee: $5</p>
                      <p className="text-sm">Within 5 miles</p>
                    </>
                  )}
                  {orderType === 'TAKEOUT' && (
                    <>
                      <p className="text-sm">Ready in 20-30 min</p>
                      <p className="text-sm">Call ahead</p>
                      <p className="text-sm">No minimum order</p>
                    </>
                  )}
                  {orderType === 'CURBSIDE' && (
                    <>
                      <p className="text-sm">Text on arrival</p>
                      <p className="text-sm">Designated spots</p>
                      <p className="text-sm">Quick & easy</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}
