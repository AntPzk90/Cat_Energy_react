import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItemI } from '@/types';

const STORAGE_KEY = 'cat-energy-cart';

interface CartStateI {
  items: CartItemI[];
  addItem: (item: Omit<CartItemI, 'quantity'>) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStateI>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === newItem.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }

          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }),

      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      changeQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: STORAGE_KEY },
  ),
);

export const selectTotalCount = (state: CartStateI) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: CartStateI) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
