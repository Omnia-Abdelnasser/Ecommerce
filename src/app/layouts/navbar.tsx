import { useState } from 'react';

import { Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { useCartStore } from '../cart-store';
import useFavStore from '../fav-store';

export default function ResponsiveNavbar() {
   const navigate = useNavigate();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   //cart state
   const cart = useCartStore((state) => state.cart) || [];

   //favorite state
   const favorite = useFavStore((state) => state.favorites) || [];
   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <nav className='border-b border-gray-200 bg-white shadow-sm'>
         <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
               <div className='flex flex-shrink-0 items-center'>
                  <div className='text-2xl font-bold text-gray-900'>
                     <span className='text-blue-600'>Brand</span>Logo
                  </div>
               </div>

               <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-8'>
                     <Link
                        to='/'
                        className='text-md px-3 py-2 font-medium text-gray-900 transition-colors hover:text-blue-600'
                     >
                        Home
                     </Link>
                     <Link
                        to='/products'
                        className='text-md px-3 py-2 font-medium text-gray-600 transition-colors hover:text-blue-600'
                     >
                        Shop
                     </Link>
                  </div>
               </div>

               <div className='flex items-center space-x-4'>
                  <div className='flex items-center space-x-2'>
                     <Button
                        onClick={() => navigate('/fav')}
                        variant='ghost'
                        size='sm'
                        className='relative p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                     >
                        <Heart className='h-5 w-5' />
                        <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                           {favorite.length}
                        </span>
                     </Button>

                     <Button
                        onClick={() => navigate('/cartstore')}
                        variant='ghost'
                        size='sm'
                        className='relative p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                     >
                        <ShoppingCart className='h-5 w-5' />
                        <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white'>
                           {cart.length}
                        </span>
                     </Button>
                  </div>

                  {/* Mobile menu button */}
                  <div className='md:hidden'>
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={toggleMenu}
                        className='p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                     >
                        {isMenuOpen ? (
                           <X className='h-6 w-6' />
                        ) : (
                           <Menu className='h-6 w-6' />
                        )}
                     </Button>
                  </div>
               </div>
            </div>

            {/* Mobile menu */}
            <div
               className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
            >
               <div className='mt-2 space-y-1 rounded-lg bg-gray-50 px-2 pb-3 pt-2'>
                  <Link
                     to='/'
                     className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 transition-colors hover:bg-white hover:text-blue-600'
                  >
                     Home
                  </Link>
                  <Link
                     to='/products'
                     className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-white hover:text-blue-600'
                  >
                     Shop
                  </Link>
               </div>
            </div>
         </div>
      </nav>
   );
}
