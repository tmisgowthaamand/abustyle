// Simple order storage using localStorage
// In a real app, this would be handled by your backend API

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  country: string;
  cancellable: boolean;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const ORDERS_STORAGE_KEY = 'abu_style_orders';

export const orderStore = {
  // Create a new order
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'cancellable'>): Order => {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const order: Order = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString(),
      status: 'pending',
      cancellable: true,
    };

    // Get existing orders
    const existingOrders = orderStore.getAllOrders();
    
    // Add new order to the beginning of the array
    const updatedOrders = [order, ...existingOrders];
    
    // Save to localStorage
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    
    return order;
  },

  // Get all orders
  getAllOrders: (): Order[] => {
    try {
      const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
      return ordersJson ? JSON.parse(ordersJson) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  },

  // Get a specific order by ID
  getOrderById: (orderId: string): Order | null => {
    const orders = orderStore.getAllOrders();
    return orders.find(order => order.id === orderId) || null;
  },

  // Update an order
  updateOrder: (orderId: string, updates: Partial<Order>): Order | null => {
    const orders = orderStore.getAllOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return null;
    
    const updatedOrder = { ...orders[orderIndex], ...updates };
    orders[orderIndex] = updatedOrder;
    
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return updatedOrder;
  },

  // Cancel an order
  cancelOrder: (orderId: string): Order | null => {
    return orderStore.updateOrder(orderId, {
      status: 'cancelled',
      cancellable: false
    });
  },

  // Clear all orders (for development/testing)
  clearAllOrders: (): void => {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
  }
};
