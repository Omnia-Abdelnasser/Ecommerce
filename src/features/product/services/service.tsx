
//all products
const URL=`https://fakestoreapi.com/products`
export const getProducts=async()=>{
    const response=await fetch(URL);
    const data=await response.json();
    return data;
}
//categories
export const getCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();
  return data;
};
