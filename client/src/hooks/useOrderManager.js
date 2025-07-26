import { useState, useEffect } from 'react';
import { ref, push, set, get, onValue, off, serverTimestamp, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../config/firebase';
import { ORDER_STATUS, ORDER_TYPES } from '../config/orderTypes';

export const useOrderManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState({});

  // Generate order number
  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    return `ADS-${timestamp}-${random}`;
  };

  // Calculate estimated completion time
  const calculateEstimatedTime = (serviceLevel) => {
    const serviceLevelTimes = {
      'pickup': 20, // 20 minutes
      'standard-delivery': 50, // 50 minutes
      'express-delivery': 35, // 35 minutes
      'drop-off': 240, // 4 hours
      'full-service': 1440, // 24 hours
      'white-glove': 2880, // 48 hours
      'corporate': 1440 // 24 hours
    };

    const minutes = serviceLevelTimes[serviceLevel] || 30;
    return Date.now() + (minutes * 60 * 1000); // Return timestamp
  };

  // Calculate pricing
  const calculatePricing = (items, serviceLevel) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    // Get delivery fee based on service level
    const deliveryFees = {
      'pickup': 0,
      'standard-delivery': 5.99,
      'express-delivery': 9.99,
      'drop-off': 25,
      'full-service': 75,
      'white-glove': 150,
      'corporate': 100
    };
    
    const deliveryFee = deliveryFees[serviceLevel] || 0;
    
    // Calculate tax (8.25% for Texas)
    const taxRate = 0.0825;
    const tax = subtotal * taxRate;
    
    const total = subtotal + deliveryFee + tax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  };

  // Create new order
  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const orderNumber = generateOrderNumber();
      const pricing = calculatePricing(orderData.items, orderData.serviceLevel);
      
      const order = {
        // Order identification
        orderNumber,
        orderType: orderData.orderType,
        serviceLevel: orderData.serviceLevel,
        status: ORDER_STATUS.PENDING,
        
        // Customer information
        customer: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          specialRequests: orderData.customer.specialRequests || ''
        },

        // Delivery/Event information
        delivery: {
          address: orderData.delivery?.address || '',
          eventDate: orderData.delivery?.eventDate || '',
          eventTime: orderData.delivery?.eventTime || '',
          guestCount: orderData.delivery?.guestCount || 0,
          eventType: orderData.delivery?.eventType || '',
          setupInstructions: orderData.delivery?.setupInstructions || ''
        },

        // Order items
        items: orderData.items.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
          customizations: item.customizations || [],
          specialInstructions: item.specialInstructions || ''
        })),

        // Pricing
        pricing,

        // Timestamps
        timestamps: {
          created: serverTimestamp(),
          updated: serverTimestamp(),
          estimated: calculateEstimatedTime(orderData.serviceLevel),
          scheduled: orderData.scheduledFor || null
        },

        // Payment and additional info
        payment: {
          method: orderData.paymentMethod || 'pending',
          status: 'pending',
          transactionId: null
        },

        // Toast API integration fields
        toast: {
          orderId: null, // Will be populated when synced with Toast
          status: 'not_synced',
          lastSync: null,
          errors: []
        },

        // Metadata
        notes: orderData.notes || '',
        source: 'web' // Track where order came from
      };

      // Push to Firebase Realtime Database
      const ordersRef = ref(database, 'orders');
      const newOrderRef = push(ordersRef);
      await set(newOrderRef, order);

      const createdOrder = { id: newOrderRef.key, ...order };
      
      setLoading(false);
      return createdOrder;

    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus, additionalData = {}) => {
    setLoading(true);
    setError(null);

    try {
      const orderRef = ref(database, `orders/${orderId}`);
      const updateData = {
        status: newStatus,
        'timestamps/updated': serverTimestamp(),
        ...additionalData
      };

      // Add status-specific timestamps
      if (newStatus === ORDER_STATUS.CONFIRMED) {
        updateData['timestamps/confirmed'] = serverTimestamp();
      } else if (newStatus === ORDER_STATUS.PREPARING) {
        updateData['timestamps/preparing'] = serverTimestamp();
      } else if (newStatus === ORDER_STATUS.READY) {
        updateData['timestamps/ready'] = serverTimestamp();
      } else if (newStatus === ORDER_STATUS.EN_ROUTE) {
        updateData['timestamps/enRoute'] = serverTimestamp();
      } else if (newStatus === ORDER_STATUS.DELIVERED || newStatus === ORDER_STATUS.COMPLETED) {
        updateData['timestamps/completed'] = serverTimestamp();
      } else if (newStatus === ORDER_STATUS.CANCELLED) {
        updateData['timestamps/cancelled'] = serverTimestamp();
      }

      await set(orderRef, { ...orders[orderId], ...updateData });
      
      setLoading(false);
      return { success: true };

    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Get single order
  const getOrder = async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const orderRef = ref(database, `orders/${orderId}`);
      const snapshot = await get(orderRef);
      
      if (snapshot.exists()) {
        const order = { id: orderId, ...snapshot.val() };
        setLoading(false);
        return order;
      } else {
        throw new Error('Order not found');
      }
    } catch (err) {
      console.error('Error getting order:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Listen to orders by status
  const listenToOrdersByStatus = (status, callback) => {
    const ordersRef = ref(database, 'orders');
    const statusQuery = query(ordersRef, orderByChild('status'), equalTo(status));
    
    const unsubscribe = onValue(statusQuery, (snapshot) => {
      const ordersData = {};
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          ordersData[child.key] = { id: child.key, ...child.val() };
        });
      }
      callback(ordersData);
    });

    return () => off(statusQuery, 'value', unsubscribe);
  };

  // Listen to orders by customer email
  const listenToCustomerOrders = (email, callback) => {
    const ordersRef = ref(database, 'orders');
    const customerQuery = query(ordersRef, orderByChild('customer/email'), equalTo(email));
    
    const unsubscribe = onValue(customerQuery, (snapshot) => {
      const ordersData = {};
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          ordersData[child.key] = { id: child.key, ...child.val() };
        });
      }
      callback(ordersData);
    });

    return () => off(customerQuery, 'value', unsubscribe);
  };

  // Listen to all orders (admin view)
  const listenToAllOrders = (callback) => {
    const ordersRef = ref(database, 'orders');
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const ordersData = {};
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          ordersData[child.key] = { id: child.key, ...child.val() };
        });
      }
      setOrders(ordersData);
      if (callback) callback(ordersData);
    });

    return () => off(ordersRef, 'value', unsubscribe);
  };

  // Get orders by date range (for analytics)
  const getOrdersByDateRange = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const ordersRef = ref(database, 'orders');
      const snapshot = await get(ordersRef);
      const filteredOrders = {};

      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const order = child.val();
          const orderDate = order.timestamps?.created;
          
          if (orderDate && orderDate >= startDate && orderDate <= endDate) {
            filteredOrders[child.key] = { id: child.key, ...order };
          }
        });
      }

      setLoading(false);
      return filteredOrders;

    } catch (err) {
      console.error('Error getting orders by date range:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Toast API sync functions
  const syncWithToast = async (orderId) => {
    try {
      // This will be implemented when Toast API is integrated
      const orderRef = ref(database, `orders/${orderId}/toast`);
      await set(orderRef, {
        status: 'sync_pending',
        lastSync: serverTimestamp()
      });
      
      return { success: true, message: 'Order queued for Toast sync' };
    } catch (err) {
      console.error('Error syncing with Toast:', err);
      throw err;
    }
  };

  // Helper functions
  const getStatusDisplay = (status) => {
    const statusMap = {
      [ORDER_STATUS.PENDING]: 'Order Received',
      [ORDER_STATUS.CONFIRMED]: 'Confirmed',
      [ORDER_STATUS.PREPARING]: 'Preparing',
      [ORDER_STATUS.READY]: 'Ready for Pickup/Delivery',
      [ORDER_STATUS.EN_ROUTE]: 'Out for Delivery',
      [ORDER_STATUS.DELIVERED]: 'Delivered',
      [ORDER_STATUS.COMPLETED]: 'Completed',
      [ORDER_STATUS.CANCELLED]: 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
      [ORDER_STATUS.CONFIRMED]: 'bg-blue-100 text-blue-800',
      [ORDER_STATUS.PREPARING]: 'bg-orange-100 text-orange-800',
      [ORDER_STATUS.READY]: 'bg-purple-100 text-purple-800',
      [ORDER_STATUS.EN_ROUTE]: 'bg-indigo-100 text-indigo-800',
      [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-800',
      [ORDER_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
      [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return {
    // State
    loading,
    error,
    orders,
    
    // Order CRUD
    createOrder,
    updateOrderStatus,
    getOrder,
    
    // Real-time listeners
    listenToOrdersByStatus,
    listenToCustomerOrders,
    listenToAllOrders,
    
    // Analytics
    getOrdersByDateRange,
    
    // Integrations
    syncWithToast,
    
    // Helpers
    calculatePricing,
    getStatusDisplay,
    getStatusColor,
    generateOrderNumber,
    
    // Constants
    ORDER_STATUS,
    ORDER_TYPES
  };
};