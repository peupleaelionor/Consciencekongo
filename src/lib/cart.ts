import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, type Product } from "@/lib/catalog";

export type Order = {
  id: string;
  name: string;
  email: string;
  lines: { id: string; name: string; price: number }[];
  total: number;
  at: string;
};

type CartState = {
  ids: string[];
  orders: Order[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  place: (name: string, email: string) => Order | null;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      ids: [],
      orders: [],
      add: (id) =>
        set((state) =>
          state.ids.includes(id) ? state : { ids: [...state.ids, id] },
        ),
      remove: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
      clear: () => set({ ids: [] }),
      place: (name, email) => {
        const lines = get()
          .ids.map((id) => products.find((product) => product.id === id))
          .filter((product): product is Product => Boolean(product))
          .map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          }));
        if (!lines.length) return null;
        const order: Order = {
          id: `TS-${Date.now().toString(36).toUpperCase()}`,
          name: name.trim(),
          email: email.trim(),
          lines,
          total: lines.reduce((sum, line) => sum + line.price, 0),
          at: new Date().toISOString(),
        };
        set((state) => ({
          ids: [],
          orders: [order, ...state.orders].slice(0, 12),
        }));
        return order;
      },
    }),
    { name: "temple-sirius-cart", skipHydration: true },
  ),
);
