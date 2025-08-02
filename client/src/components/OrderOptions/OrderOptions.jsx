import { useNavigate } from 'react-router-dom';

export default function OrderOptions({ itemName }) {
  const navigate = useNavigate();

  const handleOrderClick = (orderType) => {
    // Navigate to order page with order type and item name in state
    navigate('/order', { 
      state: { 
        orderType,
        itemName
      } 
    });
  };

  return (
    <div className="mt-16 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Order {itemName}
        </h2>
        <p className="text-base-content/70">
          from my All Da Smoke BBQ location
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* Order Takeout */}
        <div 
          className="bg-primary text-primary-content rounded-lg p-6 text-center hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => handleOrderClick('TAKEOUT')}
        >
          <i className="bi bi-bag text-4xl mb-4 block"></i>
          <h3 className="text-xl font-bold mb-2">ORDER</h3>
          <h4 className="text-lg font-semibold">TAKEOUT</h4>
        </div>

        {/* Order Delivery */}
        <div 
          className="bg-primary text-primary-content rounded-lg p-6 text-center hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => handleOrderClick('DELIVERY')}
        >
          <i className="bi bi-truck text-4xl mb-4 block"></i>
          <h3 className="text-xl font-bold mb-2">ORDER</h3>
          <h4 className="text-lg font-semibold">DELIVERY</h4>
        </div>

        {/* Order Curbside */}
        <div 
          className="bg-primary text-primary-content rounded-lg p-6 text-center hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => handleOrderClick('CURBSIDE')}
        >
          <i className="bi bi-car-front text-4xl mb-4 block"></i>
          <h3 className="text-xl font-bold mb-2">ORDER</h3>
          <h4 className="text-lg font-semibold">CURBSIDE</h4>
        </div>
      </div>
    </div>
  );
}