export default function LandingPage() {
   return (
      <div className='relative flex min-h-screen items-center justify-center'>
         <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
               backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI9Ri1TPkH2IsgSV82vVyHk2KBTqZRdikgQ&s)`,
            }}
         />

         <div className='absolute inset-0 bg-black/50'></div>

         <div className='relative z-10 px-6 text-center'>
            <h2 className='mb-8 text-5xl font-bold text-white md:text-6xl'>
               Welcome to Our Store
            </h2>

            <button className='rounded-lg bg-white px-8 py-3 text-lg font-semibold text-black transition-colors hover:bg-blue-200'>
               Shop Now
            </button>
         </div>
      </div>
   );
}
