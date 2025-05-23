// store/useCartStore.js
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  initializeCart: (userId) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const userCart = storedCart.filter((item) => item.userId === userId);
    set({ cart: userCart });
  },

  addToCart: (userId, item) => {
    const { cart } = get();

    const exists = cart.find(
      (cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.color === item.color &&
        cartItem.size === item.size
    );

    let updatedCart;

    if (exists) {
      updatedCart = cart.map((cartItem) =>
        cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      // ✅ Flatten the item + include userId
      updatedCart = [...cart, { ...item, userId }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  removeFromCart: (productId, color, size) => {
    const updatedCart = get().cart.filter(
      (item) =>
        item.productId !== productId ||
        item.color !== color ||
        item.size !== size
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  updateQuantity: (productId, color, size, quantity) => {
    const updatedCart = get().cart.map((item) =>
      item.productId === productId &&
        item.color === color &&
        item.size === size
        ? { ...item, quantity }
        : item
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },
}));
