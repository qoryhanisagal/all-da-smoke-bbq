import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { item, quantity = 1, customizations = {} } = action.payload;
      const cartId = `${item.id}-${JSON.stringify(customizations)}`;
      
      const existingItem = state.items.find(cartItem => cartItem.cartId === cartId);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(cartItem =>
            cartItem.cartId === cartId
              ? { 
                  ...cartItem, 
                  quantity: cartItem.quantity + quantity,
                  totalPrice: cartItem.unitPrice * (cartItem.quantity + quantity)
                }
              : cartItem
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, {
          cartId,
          ...item,
          quantity,
          customizations,
          unitPrice: item.price || 0,
          totalPrice: (item.price || 0) * quantity
        }]
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload)
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.cartId !== cartId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === cartId
            ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
            : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ads-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ads-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart calculations
  const cartTotal = state.items.reduce((total, item) => total + item.totalPrice, 0);
  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  // Cart actions
  const addToCart = (item, quantity = 1, customizations = {}) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { item, quantity, customizations }
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: cartId
    });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { cartId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const isItemInCart = (itemId, customizations = {}) => {
    const cartId = `${itemId}-${JSON.stringify(customizations)}`;
    return state.items.some(item => item.cartId === cartId);
  };

  const getCartItem = (itemId, customizations = {}) => {
    const cartId = `${itemId}-${JSON.stringify(customizations)}`;
    return state.items.find(item => item.cartId === cartId);
  };

  const value = {
    cart: state,
    cartTotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isItemInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CART_ACTIONS };