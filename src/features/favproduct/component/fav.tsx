// src/features/favproduct/component/fav.tsx
import { Helmet } from '@dr.pogodin/react-helmet';
import { Trash } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { toast } from '@/shared/hooks/use-toast';

import { useCartStore } from '@/app/cart-store';
import useFavStore from '@/app/fav-store';

export default function FavPage() {
   const favorites = useFavStore((state) => state.favorites);
   const clearFromFav = useFavStore((state) => state.clearFav);
   const addToCart = useCartStore((state) => state.addToCart);
   const removeFromFav = useFavStore((state) => state.removeFromFav);

   if (favorites.length === 0)
      return (
         <div className='flex min-h-screen items-center justify-center bg-gray-50'>
            <p className='text-xl text-gray-600'>Your FavProduct is empty</p>
         </div>
      );

   return (
      <>
         <Helmet>
            <title>Fav Product</title>
            <meta
               name='description'
               content='Your favorite products. Review your selected items and add them to your cart.'
            />
         </Helmet>
         <div className='min-h-screen bg-gray-50 py-12'>
            <div className='container mx-auto max-w-5xl'>
               <h1 className='mb-8 text-xl font-bold text-gray-800 sm:text-3xl'>
                  Your Fav Product
               </h1>

               <div className='space-y-4'>
                  {favorites.map((product, index) => (
                     <div
                        key={index}
                        className='flex flex-col items-center rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md sm:flex-row'
                     >
                        <img
                           src={product.image}
                           alt={product.title}
                           className='mr-6 h-24 w-24 rounded object-cover'
                        />
                        <div className='flex-1'>
                           <h2 className='text-lg font-semibold text-gray-700'>
                              {product.title}
                           </h2>
                           <p className='mt-1 text-center font-bold text-gray-700'>
                              {product.price}$
                           </p>
                        </div>
                        <div className='mt-4 flex gap-2 sm:mt-0'>
                           <Button
                              onClick={() => removeFromFav(product.id)}
                              className='bg-red-500 text-white transition-colors hover:bg-red-600'
                           >
                              <Trash className='h-5 w-5' />
                           </Button>

                           <div className='ml-4'>
                              <Button
                                 onClick={() => {
                                    addToCart(product);
                                    toast({
                                       title: 'Added to Cart 🛒',
                                       description: `${product.title} has been added to your cart.`,
                                    });
                                 }}
                                 className='bg-green-700 text-white transition-colors hover:bg-gray-600'
                              >
                                 Add to Cart
                              </Button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className='mt-8 flex justify-end'>
                  <Button
                     onClick={() => clearFromFav()}
                     className='bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700'
                  >
                     Clear All
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
}
