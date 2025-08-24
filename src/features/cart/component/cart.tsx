// src/features/cart/CartPage.tsx
import { useCartStore } from "@/app/cartSore";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate();
    const cart = useCartStore((state) => state.cart);
const deleteFromCart = useCartStore((state) => state.deleteFromCart);
const increaseQuantity = useCartStore((state) => state.increaseQuantity);
const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    if (cart.length === 0)
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-600">Your cart is empty</p>
            </div>
        );

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

                <div className="space-y-4">
                    {cart.map((product, index) => (
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
                                <h2 className="text-lg font-semibold text-gray-700">{product.title}</h2>
                                <p className="text-gray-700 mt-1">${product.price}</p>
                                             <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 bg-gray-700 rounded"
               onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <span className="px-2 text-black">{product.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-700 rounded"
               onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
                            </div>
         

                            <Button
                                onClick={() => deleteFromCart(product.id)}
                                className="bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow">
                    <p className="text-2xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
                    <Button onClick={()=>navigate("/checkout")} className="mt-4 sm:mt-0 bg-green-600 text-white hover:bg-green-700 transition-colors px-6 py-3">
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
