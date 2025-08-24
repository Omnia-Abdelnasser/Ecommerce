import { useCartStore } from "@/app/cartSore";
import { Button } from "@/shared/components/ui/button";
import React from "react";
import { useProducts } from "../hook/hook";
import useFavStore from "@/app/favStore";

const Products = () => {
  
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const addToCart = useCartStore((state) => state.addToCart)||(()=>{});
    //add to favorite
    const addToFav = useFavStore((state) => state.addToFav)||(()=>{});
    const { data: products, isLoading, error } = useProducts();

    
    if (isLoading) return <div>Loading...</div>;
    if (error || !products) return <div>Error loading products</div>;

    //categories
    const categories = Array.from(new Set(products.map((p: any) => p.category)));

    //filter products by category
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((p: any) => p.category === selectedCategory);

    return (
        <div className="bg-white min-h-screen px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
                <div className="mb-6">
                    <select
                        className="border border-gray-300 rounded text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all" className="text-gray-700">All Categories</option>
                        {categories.map((category: any) => (
                            <option key={category} value={category} className="text-gray-700">
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product: any) => (
                    <div
                        key={product.id}
                        className="border-2 rounded-lg p-4 border-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">
                            {product.title}
                        </h2>
                        <p className="text-gray-600 mb-4">${product.price}</p>
                        <div className="mt-auto flex flex-row gap-2">
                            <Button
                                onClick={() => addToCart(product)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                            >
                                Add to Cart
                            </Button>
                            <Button onClick={() => addToFav(product)}
                                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors w-full"
                            >
                                Add to Wishlist
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; export default Products;
