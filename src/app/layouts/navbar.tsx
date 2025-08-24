

import { Button } from '@/shared/components/ui/button';
import { Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../cartSore';
import useFavStore from '../favStore';


export default function ResponsiveNavbar() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //cart state
    const cart = useCartStore((state) => state.cart)||[];
    
//favorite state
const favorite = useFavStore((state) => state.favorites)||[];
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 flex items-center">
                        <div className="text-2xl font-bold text-gray-900">
                            <span className="text-blue-600">Brand</span>Logo
                        </div>
                    </div>


                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/products" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors">
                                Shop
                            </Link>

                        </div>
                    </div>


                    <div className="flex items-center space-x-4">

                        <div className="flex items-center space-x-2">
                            <Button onClick={()=>navigate("/fav")} variant="ghost" size="sm" className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                <Heart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {favorite.length}
                                </span>
                            </Button>

                            <Button onClick={() => navigate("/cartstore")} variant="ghost" size="sm" className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMenu}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
                        <Link
                            to="/"
                            className="text-gray-900 hover:text-blue-600 hover:bg-white block px-3 py-2 text-base font-medium rounded-md transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="text-gray-600 hover:text-blue-600 hover:bg-white block px-3 py-2 text-base font-medium rounded-md transition-colors"
                        >
                            Shop
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}