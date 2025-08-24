import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface FavState {
  favorites: Product[];
  addToFav: (product: Product) => void;
  removeFromFav: (id: number) => void;
  clearFav: () => void;
}

export const useFavStore = create<FavState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFav: (item) => {
        const exists = get().favorites.find((i) => i.id === item.id);
        if (!exists) {
          set({ favorites: [...get().favorites, item] });
        }
      },

      removeFromFav: (id) => {
        set({ favorites: get().favorites.filter((item) => item.id !== id) });
      },

      clearFav: () => set({ favorites: [] }),
    }),
    {
      name: "fav-store", 
    }
  )
);
export default useFavStore;