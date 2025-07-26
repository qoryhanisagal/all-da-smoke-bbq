// Order Types and Service Levels Configuration for Realtime Database
export const ORDER_TYPES = {
  FOOD_TRUCK: 'food-truck',
  DELIVERY: 'delivery', 
  CATERING: 'catering'
};

export const SERVICE_LEVELS = {
  // Food Truck Services
  PICKUP: {
    id: 'pickup',
    name: 'Pickup',
    description: 'Pick up your order at our food truck location',
    orderTypes: [ORDER_TYPES.FOOD_TRUCK],
    deliveryFee: 0,
    minimumOrder: 0,
    estimatedTime: '15-25 minutes',
    features: ['Quick service', 'Fresh and hot']
  },

  // Delivery Services
  STANDARD_DELIVERY: {
    id: 'standard-delivery',
    name: 'Standard Delivery',
    description: 'Basic food delivery to your address',
    orderTypes: [ORDER_TYPES.DELIVERY],
    deliveryFee: 5.99,
    minimumOrder: 25,
    estimatedTime: '45-60 minutes',
    features: ['Contactless delivery option', 'Real-time tracking']
  },

  EXPRESS_DELIVERY: {
    id: 'express-delivery',
    name: 'Express Delivery',
    description: 'Priority delivery for faster service',
    orderTypes: [ORDER_TYPES.DELIVERY],
    deliveryFee: 9.99,
    minimumOrder: 35,
    estimatedTime: '30-45 minutes',
    features: ['Priority handling', 'Guaranteed delivery time', 'Real-time tracking']
  },

  // Catering Services
  DROP_OFF: {
    id: 'drop-off',
    name: 'Drop-Off Catering',
    description: 'Food delivered in disposable containers',
    orderTypes: [ORDER_TYPES.CATERING],
    deliveryFee: 25,
    minimumOrder: 200,
    estimatedTime: '2-4 hours advance notice',
    features: ['Disposable containers', 'Basic setup', 'Serving utensils included']
  },

  FULL_SERVICE: {
    id: 'full-service',
    name: 'Full-Service Catering',
    description: 'Complete setup with chafing dishes and serving equipment',
    orderTypes: [ORDER_TYPES.CATERING],
    deliveryFee: 75,
    minimumOrder: 500,
    estimatedTime: '24 hours advance notice',
    features: ['Chafing dishes', 'Professional setup', 'Serving utensils', 'Basic cleanup']
  },

  WHITE_GLOVE: {
    id: 'white-glove',
    name: 'White Glove Service',
    description: 'Premium service with full setup, serving, and cleanup',
    orderTypes: [ORDER_TYPES.CATERING],
    deliveryFee: 150,
    minimumOrder: 1000,
    estimatedTime: '48 hours advance notice',
    features: [
      'Professional staff for setup and serving',
      'Premium tableware and linens',
      'Complete cleanup service',
      'Event coordination',
      'On-site service during event'
    ]
  },

  CORPORATE: {
    id: 'corporate',
    name: 'Corporate Catering',
    description: 'Professional presentation for business events',
    orderTypes: [ORDER_TYPES.CATERING],
    deliveryFee: 100,
    minimumOrder: 750,
    estimatedTime: '24 hours advance notice',
    features: [
      'Professional presentation',
      'Corporate invoicing',
      'Dietary accommodations',
      'Meeting-friendly setup',
      'Cleanup included'
    ]
  }
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed', 
  PREPARING: 'preparing',
  READY: 'ready',
  EN_ROUTE: 'en-route',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Status flow for different order types
export const STATUS_FLOWS = {
  [ORDER_TYPES.FOOD_TRUCK]: [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED
  ],
  [ORDER_TYPES.DELIVERY]: [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.READY,
    ORDER_STATUS.EN_ROUTE,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.COMPLETED
  ],
  [ORDER_TYPES.CATERING]: [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED
  ]
};

// Helper functions
export const getServiceLevelsByOrderType = (orderType) => {
  return Object.values(SERVICE_LEVELS).filter(level => 
    level.orderTypes.includes(orderType)
  );
};

export const getServiceLevelById = (serviceId) => {
  return Object.values(SERVICE_LEVELS).find(level => level.id === serviceId);
};

export const getStatusFlow = (orderType) => {
  return STATUS_FLOWS[orderType] || STATUS_FLOWS[ORDER_TYPES.FOOD_TRUCK];
};

export const getNextStatuses = (currentStatus, orderType) => {
  const flow = getStatusFlow(orderType);
  const currentIndex = flow.indexOf(currentStatus);
  
  if (currentIndex === -1 || currentIndex === flow.length - 1) {
    return [];
  }
  
  // Return next status and allow cancellation for early statuses
  const nextStatuses = [flow[currentIndex + 1]];
  if (currentIndex < 2) { // Can cancel if pending or confirmed
    nextStatuses.push(ORDER_STATUS.CANCELLED);
  }
  
  return nextStatuses;
};