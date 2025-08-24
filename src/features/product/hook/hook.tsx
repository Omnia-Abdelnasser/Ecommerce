import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../services/service";
export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,

  });
}