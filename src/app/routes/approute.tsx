import { Route, Routes } from "react-router-dom"

import Products from "@/features/product/component/products"
import LandingPage from "@/pages/landing"
import ResponsiveNavbar from "../layouts/navbar"
import CartPage from "@/features/cart/component/cart"
import FavPage from "@/features/favproduct/componenet/fav"
import CheckoutPage from "@/features/cart/component/checkout"


const AppRoute = () =>{
    return (
    <>
      <ResponsiveNavbar/>
         <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cartstore" element={<CartPage/>} />
      <Route path="/fav" element={<FavPage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        </>
    )
    

}
export default AppRoute;