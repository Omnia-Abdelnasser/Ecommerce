import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function LandingPage() {
   return (
      <>
         <Helmet>
            <title>home page</title>
            <meta
               name='description'
               content='Welcome to our store. Discover amazing products and shop now!'
            />
         </Helmet>
         <div className='relative flex min-h-screen items-center justify-center'>
            <div
               className='absolute inset-0 bg-cover bg-center bg-no-repeat'
               style={{
                  backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI9Ri1TPkH2IsgSV82vVyHk2KBTqZRdikgQ&s)`,
               }}
            />

            <div className='absolute inset-0 bg-black/50'></div>

            <div className='relative z-10 px-6 text-center'>
               <h2 className='mb-8 text-2xl font-bold text-white sm:text-6xl'>
                  Welcome to Our Store
               </h2>
               <Link to='/products'>
                  <Button className='rounded-lg bg-white px-8 py-3 text-lg font-semibold text-black transition-colors hover:bg-blue-200'>
                     Shop Now
                  </Button>
               </Link>
            </div>
         </div>
      </>
   );
}
