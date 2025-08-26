import React from 'react';

import { Helmet } from '@dr.pogodin/react-helmet';
import { Heart } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { toast } from '@/shared/hooks/use-toast';

import { useProducts } from '@/features/product/hook/hook';

import { useCartStore } from '@/app/cart-store';
import useFavStore from '@/app/fav-store';

const Products = () => {
   const [selectedCategory, setSelectedCategory] = React.useState('all');
   const addToCart = useCartStore((state) => state.addToCart) || (() => {});
   //add to favorite
   const addToFav = useFavStore((state) => state.addToFav) || (() => {});
   const { data: products, isLoading, error } = useProducts();

   if (isLoading) return <Skeleton />;
   if (error || !products)
      return (
         <div className='text-center text-xl text-red-800'>
            Error loading products
         </div>
      );

   //categories
   const categories = Array.from(new Set(products.map((p: any) => p.category)));

   //filter products by category
   const filteredProducts =
      selectedCategory === 'all'
         ? products
         : products.filter((p: any) => p.category === selectedCategory);

   return (
      <>
         <Helmet>
            <title>Products</title>
            <meta
               name='description'
               content='Browse our wide selection of products. Find the best deals and add to your cart or wishlist.'
            />
         </Helmet>
         <div className='min-h-screen bg-white px-4 py-8'>
            <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
               <h1 className='text-2xl font-bold text-gray-800 sm:text-3xl'>
                  All Products
               </h1>
               <div>
                  <select
                     className='w-full rounded border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto'
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                     <option value='all' className='text-gray-700'>
                        All Categories
                     </option>
                     {categories.map((category: any) => (
                        <option
                           key={category}
                           value={category}
                           className='text-gray-700'
                        >
                           {category}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
               {filteredProducts.map((product: any) => (
                  <div
                     key={product.id}
                     className='flex flex-col rounded-lg border-2 border-white p-4 shadow-sm transition-shadow hover:shadow-md'
                  >
                     <img
                        src={product.image}
                        alt={product.title}
                        className='mb-4 h-48 w-full rounded object-cover'
                     />
                     <h2 className='mb-2 text-xl font-semibold text-gray-700'>
                        {product.title}
                     </h2>
                     <p className='mb-4 font-bold text-gray-600'>
                        {product.price}$
                     </p>
                     <div className='mt-auto flex flex-row gap-2'>
                        <Button
                           onClick={() => {
                              addToCart(product);
                              toast({
                                 title: 'Added to Cart 🛒',
                                 description: `${product.title} has been added to your cart.`,
                              });
                           }}
                           className='w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
                        >
                           Add to Cart
                        </Button>
                        <Button
                           onClick={() => {
                              addToFav(product);
                              toast({
                                 title: 'Added to Favorites ❤️',
                                 description: `${product.title} has been added to your wishlist.`,
                              });
                           }}
                           className='w-12 rounded bg-red-400 px-4 py-2 text-white transition-colors hover:bg-red-500'
                        >
                           <Heart className='h-5 w-5' />
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};
export default Products;
