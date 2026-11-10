import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, type Product } from "@/lib/catalog";

export type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
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
  place: (buyer: { name: string; email: string; phone: string; city: string }) => Order | null;
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
      place: (buyer) => {
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
          name: buyer.name.trim(),
          email: buyer.email.trim(),
          phone: buyer.phone.trim(),
          city: buyer.city.trim(),
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
