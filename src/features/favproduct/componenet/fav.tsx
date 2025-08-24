// src/features/favproduct/component/fav.tsx
import { useCartStore } from "@/app/cartSore";
import useFavStore from "@/app/favStore";
import { Button } from "@/shared/components/ui/button";

export default function FavPage() {
  const favorites = useFavStore((state) => state.favorites);
  const clearFromFav = useFavStore((state) => state.clearFav);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromFav = useFavStore((state) => state.removeFromFav);

  if (favorites.length === 0)
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Your FavProduct is empty</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Your Fav Product
        </h1>

        <div className="space-y-4">
          {favorites.map((product, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-cover rounded mr-6"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-700">
                  {product.title}
                </h2>
                <p className="text-gray-700 mt-1">${product.price}</p>
              </div>

              <Button
                onClick={() => removeFromFav(product.id)}
                className="bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Remove from Fav
              </Button>

              <div className="ml-4">
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

    
        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => clearFromFav()}
            className="bg-red-600 text-white hover:bg-red-700 transition-colors px-6 py-3"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
