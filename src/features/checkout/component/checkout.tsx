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
   // cart actions
   const clearCart = useCartStore((state) => state.clearCart);
   const cart = useCartStore((state) => state.cart);
   // form submitted state
   const [submitted, setSubmitted] = useState(false);
   // form validation
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
   const onSubmit = (vales: z.infer<typeof FormSchema>) => {
      console.log('Order placed:', { ...vales, cart, total });
      clearCart();
      setSubmitted(true);
   };

   if (submitted) {
      return (
         <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
            <h1 className='text-2xl font-bold text-green-600'>
               ✅ Order Confirmed
            </h1>
            <p className='mt-2 text-gray-700'>
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
         <div className='min-h-screen w-full bg-slate-50'>
            <div className='container mx-auto max-w-xl bg-gray-50 py-10'>
               <h1 className='mb-6 text-3xl font-bold'>Checkout</h1>

               {cart.length === 0 ? (
                  <p className='text-gray-600'>Your cart is empty.</p>
               ) : (
                  <>
                     <ul className='mb-6 space-y-2'>
                        {cart.map((item) => (
                           <li
                              key={item.id}
                              className='flex justify-between rounded bg-gray-100 p-2 text-black'
                           >
                              <span>
                                 {item.title} × {item.quantity}
                              </span>
                              {/* /                <span>${item.price * item.quantity}</span> */}
                           </li>
                        ))}
                     </ul>

                     <p className='mb-4 text-lg font-bold text-black'>
                        Total: ${total.toFixed(2)}
                     </p>
                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className='max-w-lg space-y-4 text-black'
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
                                       />
                                    </FormControl>
                                    <FormMessage className='text-red text-sm' />
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
                                       />
                                    </FormControl>
                                    <FormMessage className='text-red text-sm' />
                                 </FormItem>
                              )}
                           />

                           <Button
                              type='submit'
                              className='bg-blue-600 text-white hover:bg-blue-700'
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
