import { useReducer, useEffect } from 'react';
import { CartContext } from './CartContext.js';
import { CART_ACTIONS } from './useCart';

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === action.payload.item.id &&
          JSON.stringify(item.customizations) === JSON.stringify(action.payload.customizations)
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        const newItem = {
          ...action.payload.item,
          quantity: action.payload.quantity,
          customizations: action.payload.customizations || {},
          uniqueId: `${action.payload.item.id}-${Date.now()}-${Math.random()}`
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.uniqueId !== action.payload)
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.uniqueId === action.payload.uniqueId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case CART_ACTIONS.CLEAR_CART:
      return { items: [] };

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ads-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartState.items.length > 0) {
      localStorage.setItem('ads-cart', JSON.stringify(cartState));
    } else {
      localStorage.removeItem('ads-cart');
    }
  }, [cartState]);

  // Calculate cart totals
  const itemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartState.items.reduce((total, item) => {
    const itemPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  // Cart actions
  const addToCart = (item, quantity = 1, customizations = {}) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { item, quantity, customizations }
    });
  };

  const removeFromCart = (uniqueId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: uniqueId
    });
  };

  const updateQuantity = (uniqueId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(uniqueId);
    } else {
      dispatch({
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { uniqueId, quantity }
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const value = {
    items: cartState.items,
    itemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};