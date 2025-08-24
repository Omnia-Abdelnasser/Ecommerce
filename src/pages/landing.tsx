

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
    
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI9Ri1TPkH2IsgSV82vVyHk2KBTqZRdikgQ&s)`
        }}
      />
      
    
      <div className="absolute inset-0 bg-black/50"></div>

     
      <div className="relative z-10 text-center px-6">
      
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Welcome to Our Store
        </h2>

        
        <button className="bg-white text-black px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-200 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
}