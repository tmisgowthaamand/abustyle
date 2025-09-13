import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
  attrs?: Record<string, string>;
};

type UseCartReturn = {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  add: (product: {
    id: string;
    title: string;
    price: number;
    image: string;
    stock: number;
    attrs?: Record<string, string>;
  }, qty?: number) => void;
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
  }) => Promise<void>;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  isInCart: (productId: string) => boolean;
};

const CART_STORAGE_KEY = 'abu_cart';

// Helper to get cart from localStorage
const getStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage', error);
    return [];
  }
};

// Helper to save cart to localStorage
const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage', error);
  }
};

export function useCart(): UseCartReturn {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => getStoredCart());
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Calculate total number of items
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  
  // Check if a product is in the cart
  const isInCart = (productId: string): boolean => {
    return cartItems.some(item => item.productId === productId);
  };
  
  // Add item to cart (legacy method)
  const add = (
    product: {
      id: string;
      title: string;
      price: number;
      image: string;
      stock: number;
      attrs?: Record<string, string>;
    },
    qty: number = 1
  ) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        return prevItems.map((item, index) => 
          index === existingItemIndex
            ? { 
                ...item, 
                qty: Math.min(item.qty + qty, item.stock),
                attrs: { ...item.attrs, ...product.attrs }
              }
            : item
        );
      }
      
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: Math.min(qty, product.stock || 100),
        stock: product.stock || 100,
        attrs: product.attrs
      };
      
      return [...prevItems, newItem];
    });
    
    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart`
    });
  };
  
  // Add item to cart (new method with async/await support)
  const addToCart = async (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
  }): Promise<void> => {
    const qty = product.quantity || 1;
    
    return new Promise((resolve, reject) => {
      try {
        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.productId === product.id);
          
          if (existingItemIndex >= 0) {
            // Update quantity if product exists
            const updatedItems = prevItems.map((item, index) => 
              index === existingItemIndex
                ? { ...item, qty: item.qty + qty }
                : item
            );
            
            toast.success('Updated cart', {
              description: `Updated quantity of ${product.name} in your cart`
            });
            
            resolve();
            return updatedItems;
          }
          
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            title: product.name,
            price: product.price,
            image: product.image || '/images/placeholder.svg',
            qty: qty,
            stock: 100, // Default stock value
            attrs: {}
          };
          
          toast.success('Added to cart', {
            description: `${product.name} has been added to your cart`
          });
          
          resolve();
          return [...prevItems, newItem];
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart');
        reject(error);
      }
    });
  };
  
  // Remove item from cart
  const remove = (id: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      const newItems = prevItems.filter(item => item.id !== id);
      
      if (itemToRemove) {
        toast.success('Removed from cart', {
          description: `${itemToRemove.title} has been removed from your cart`
        });
      }
      
      return newItems;
    });
  };
  
  // Update item quantity
  const updateQty = (id: string, qty: number) => {
    if (qty < 1) {
      remove(id);
      return;
    }
    
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === id);
      
      if (itemIndex === -1) return prevItems;
      
      // Ensure quantity doesn't exceed stock
      const clampedQty = Math.min(qty, prevItems[itemIndex].stock);
      
      if (clampedQty === prevItems[itemIndex].qty) {
        return prevItems; // No change needed
      }
      
      const newItems = [...prevItems];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        qty: clampedQty
      };
      
      // Save to localStorage
      saveCart(newItems);
      
      return newItems;
    });
  };
  
  // Clear cart
  const clear = () => {
    setCartItems([]);
    toast.success('Cart cleared', {
      description: 'Your shopping cart is now empty'
    });
  };
  
  return {
    items: cartItems,
    subtotal,
    itemCount,
    add,
    addToCart,
    remove,
    updateQty,
    clear,
    isInCart
  };
}
