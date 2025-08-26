import { Route, Routes } from 'react-router-dom';

import CartPage from '@/features/cart/component/cart';
import CheckoutPage from '@/features/checkout/component/checkout';
import FavPage from '@/features/favproduct/component/fav';
import Products from '@/features/product/component/products';

import LandingPage from '@/pages/landing';

import ResponsiveNavbar from '../layouts/navbar';

const AppRoute = () => {
   return (
      <>
         <ResponsiveNavbar />
         <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cartStore' element={<CartPage />} />
            <Route path='/fav' element={<FavPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='*' element={<div>404 Not Found</div>} />
         </Routes>
      </>
   );
};
export default AppRoute;
