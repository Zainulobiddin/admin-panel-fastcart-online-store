import { axiosRequest } from "@/utils/axios";
import axios from "axios";
import { create } from "zustand";

export const useProducts = create((set) => ({
  products: [],
  colors: [],
  brands: [],
  subcategories: [],

  getProducts: async () => {
    try {
      const { data } = await axios.get(
        ` http://37.27.29.18:8002/Product/get-products`
      );
      set({ products: data?.data.products });
      set({ colors: data?.data.colors });
      set({ brands: data?.data.brands });
    } catch (error) {
      console.error(error);
    }
  },

  getSubcategories: async () => {
    try {
      const { data } = await axios.get(
        `http://37.27.29.18:8002/SubCategory/get-sub-category`
      );
      set({ subcategories: data?.data });
    } catch (error) {
      console.error(error);
    }
  },

  setAddProducts: async (formData) => {
    try {
      await axiosRequest.post(`/Product/add-product`, formData);
    } catch (error) {
      console.error(error);
    }
  },
}));
