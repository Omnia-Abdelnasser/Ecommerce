

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useCartStore } from "@/app/cartSore";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ? item.quantity : 1),
    0
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order placed:", { name, address, cart, total });
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-green-600">✅ Order Confirmed</h1>
        <p className="mt-2 text-gray-700">
          Thank you {name}, your order has been placed!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
    <div className="container mx-auto  max-w-2xl py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between bg-gray-100 text-black p-2 rounded"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                {/* <span>${item.price * item.quantity}</span> */}
              </li>
            ))}
          </ul>

          <p className="font-bold text-lg mb-4 text-black">Total: ${total.toFixed(2)}</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Place Order
            </Button>
          </form>
        </>
      )}
    </div>
    </div>
  );
}
