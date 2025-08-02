import { useState } from 'react';
import { useCart } from '../../context/useCart';
import { useOrderManager } from '../../hooks/useOrderManager';
import { ORDER_TYPES } from '../../config/orderTypes';

export default function Cart({ isOpen, onClose, onCheckout }) {
  const { items: cart, cartTotal, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { createOrder, loading } = useOrderManager();
  const [orderType, setOrderType] = useState('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const handleQuantityChange = (cartId, newQuantity) => {
    updateQuantity(cartId, parseInt(newQuantity));
  };

  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      const orderData = {
        items: cart.items,
        customerInfo,
        orderType,
        serviceLevel: orderType === 'delivery' ? 'standard-delivery' : 'pickup'
      };

      const result = await createOrder(orderData);
      
      if (result.success) {
        clearCart();
        onClose();
        if (onCheckout) {
          onCheckout(result.order);
        }
        alert(`Order placed successfully! Order #${result.order.orderNumber}`);
      } else {
        alert(`Order failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h2 className="text-2xl font-bold">Your Cart ({itemCount} items)</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {/* Cart Items */}
          {cart.items.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-base-content/70 mb-4">Your cart is empty</p>
              <button onClick={onClose} className="btn btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cart.items.map((item) => (
                <div key={item.cartId} className="flex items-center space-x-4 p-4 border border-base-300 rounded-lg">
                  <img
                    src={item.image || `https://picsum.photos/80/80?random=${item.id}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-base-content/70">{item.description}</p>
                    
                    {/* Customizations */}
                    {Object.keys(item.customizations).length > 0 && (
                      <div className="text-xs text-base-content/60 mt-1">
                        {Object.entries(item.customizations).map(([key, value]) => (
                          <span key={key} className="mr-2">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                          className="btn btn-xs btn-circle btn-outline"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                          className="btn btn-xs btn-circle btn-outline"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                        <button
                          onClick={() => handleRemoveItem(item.cartId)}
                          className="text-xs text-error hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {cart.items.length > 0 && (
          <div className="border-t border-base-300 p-6">
            {/* Order Type */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">Order Type</span>
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">
                  <span className="label-text">Name *</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Phone *</span>
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="your@email.com"
                />
              </div>
              
              {orderType === 'delivery' && (
                <div>
                  <label className="label">
                    <span className="label-text">Address *</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="input input-bordered w-full"
                    placeholder="Delivery address"
                    required
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="label">
                <span className="label-text">Special Instructions</span>
              </label>
              <textarea
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                className="textarea textarea-bordered w-full"
                placeholder="Any special requests..."
                rows={2}
              />
            </div>

            {/* Total and Checkout */}
            <div className="flex items-center justify-between pt-4 border-t border-base-300">
              <div>
                <p className="text-lg font-semibold">Total: ${cartTotal.toFixed(2)}</p>
                <p className="text-sm text-base-content/70">
                  {orderType === 'delivery' ? '+ delivery fee' : 'Pickup - no delivery fee'}
                </p>
              </div>
              
              <div className="space-x-2">
                <button
                  onClick={clearCart}
                  className="btn btn-outline btn-error"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}