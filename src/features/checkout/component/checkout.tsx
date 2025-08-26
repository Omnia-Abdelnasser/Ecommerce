import { useState } from 'react';

import { Helmet } from '@dr.pogodin/react-helmet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

import { FormSchema } from '@/features/checkout/form-validate';

import { useCartStore } from '@/app/cart-store';

export default function CheckoutPage() {
   const clearCart = useCartStore((state) => state.clearCart);
   const cart = useCartStore((state) => state.cart);
   const [submitted, setSubmitted] = useState(false);

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         address: '',
      },
   });

   const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity ? item.quantity : 1),
      0
   );

   const onSubmit = (values: z.infer<typeof FormSchema>) => {
      console.log('Order placed:', { ...values, cart, total });
      clearCart();
      setSubmitted(true);
   };

   if (submitted) {
      return (
         <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center'>
            <h1 className='text-xl font-bold text-green-600 sm:text-2xl'>
               ✅ Order Confirmed
            </h1>
            <p className='mt-2 text-sm text-gray-700 sm:text-base'>
               Thank you {form.getValues('name')}, your order has been placed!
            </p>
         </div>
      );
   }

   return (
      <>
         <Helmet>
            <title>Checkout</title>
            <meta
               name='description'
               content='Checkout page for your store. Complete your purchase securely.'
            />
         </Helmet>
         <div className='min-h-screen w-full bg-slate-50 px-4'>
            <div className='container mx-auto max-w-xl rounded-lg bg-white px-6 py-8 shadow-md sm:px-10'>
               <h1 className='mb-6 text-center text-2xl font-bold sm:text-3xl'>
                  Checkout
               </h1>

               {cart.length === 0 ? (
                  <p className='text-center text-gray-600'>
                     Your cart is empty.
                  </p>
               ) : (
                  <>
                     <ul className='mb-6 space-y-2'>
                        {cart.map((item) => (
                           <li
                              key={item.id}
                              className='flex flex-col rounded bg-gray-100 p-3 text-sm text-black sm:flex-row sm:justify-between sm:text-base'
                           >
                              <span>
                                 {item.title} × {item.quantity}
                              </span>
                              <span className='mt-1 font-medium sm:ml-4 sm:mt-0'>
                                 ${item.price * (item.quantity ?? 1)}
                              </span>
                           </li>
                        ))}
                     </ul>

                     <p className='mb-4 text-center text-lg font-bold text-black sm:text-left sm:text-xl'>
                        Total: ${total.toFixed(2)}
                     </p>

                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className='space-y-4 text-black'
                        >
                           <FormField
                              name='name'
                              control={form.control}
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder='Your Name'
                                          {...field}
                                          className='w-full'
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              name='address'
                              control={form.control}
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Shipping Address</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder='Shipping Address'
                                          {...field}
                                          className='w-full'
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <Button
                              type='submit'
                              className='w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 sm:py-3 sm:text-base'
                           >
                              Place Order
                           </Button>
                        </form>
                     </Form>
                  </>
               )}
            </div>
         </div>
      </>
   );
}
