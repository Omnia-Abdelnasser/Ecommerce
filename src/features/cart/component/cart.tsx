// src/features/cart/CartPage.tsx
import { Helmet } from '@dr.pogodin/react-helmet';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { useCartStore } from '@/app/cart-store';

export default function CartPage() {
   const navigate = useNavigate();
   const cart = useCartStore((state) => state.cart);
   const deleteFromCart = useCartStore((state) => state.deleteFromCart);
   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
   const totalPrice = cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
   );
   if (cart.length === 0)
      return (
         <div className='flex min-h-screen items-center justify-center bg-gray-50'>
            <p className='text-xl text-gray-600'>Your cart is empty</p>
         </div>
      );

   return (
      <>
         <Helmet>
            <title> Your Cart</title>
            <meta
               name='description'
               content='Your shopping cart. Review your selected items and proceed to checkout.'
            />
         </Helmet>
         <div className='min-h-screen bg-gray-50 py-12'>
            <div className='container mx-auto max-w-5xl'>
               <h1 className='mb-8 text-xl font-bold text-gray-800 sm:text-3xl'>
                  Your Cart
               </h1>

               <div className='space-y-4'>
                  {cart.map((product, index) => (
                     <div
                        key={index}
                        className='flex flex-col items-center gap-4 rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md sm:flex-row sm:gap-6'
                     >
                        <img
                           src={product.image}
                           alt={product.title}
                           className='h-24 w-24 rounded object-cover sm:h-28 sm:w-28'
                        />
                        <div className='flex flex-1 flex-col items-center text-center sm:items-start sm:text-left'>
                           <h2 className='text-lg font-semibold text-gray-700'>
                              {product.title}
                           </h2>
                           <p className='mb-3 mt-1 font-bold text-gray-700'>
                              ${product.price}
                           </p>
                           <div className='flex items-center gap-2'>
                              <button
                                 className='rounded bg-gray-700 px-3 py-1 text-white'
                                 onClick={() => decreaseQuantity(product.id)}
                              >
                                 -
                              </button>
                              <span className='px-2 text-black'>
                                 {product.quantity}
                              </span>
                              <button
                                 className='rounded bg-gray-700 px-3 py-1 text-white'
                                 onClick={() => increaseQuantity(product.id)}
                              >
                                 +
                              </button>
                           </div>
                        </div>

                        <Button
                           onClick={() => deleteFromCart(product.id)}
                           className='mt-2 bg-red-500 text-white transition-colors hover:bg-red-600 sm:mt-0'
                        >
                           <Trash className='h-5 w-5' />
                        </Button>
                     </div>
                  ))}
               </div>

               <div className='mt-8 flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow sm:flex-row'>
                  <p className='text-2xl font-bold text-gray-800'>
                     Total: ${totalPrice.toFixed(2)}
                  </p>
                  <Button
                     onClick={() => navigate('/checkout')}
                     className='mt-4 bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700 sm:mt-0'
                  >
                     Checkout
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
}
