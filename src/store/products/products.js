import { axiosRequest, axiosStandart } from "@/utils/axios";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useProducts = create((set, get) => ({
  products: [],
  colors: [],
  brands: [],
  subcategories: [],
  productsByID: [],

  getProducts: async () => {
    try {
      const { data } = await axiosStandart.get(`/Product/get-products`);
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
      get().getProducts();
      toast.info("The product was added successfully.");
    } catch (error) {
      console.error(error);
      const errors = error?.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err));
      } else {
        toast.error("Something went wrong");
      }
    }
  },

  deleteProduct: async (id) => {
    try {
      await axiosRequest.delete(`/Product/delete-product?id=${id}`);
      get().getProducts();
    } catch (error) {
      console.error(error);
    }
  },

  getProductByID: async (id) => {
    try {
      const { data } = await axiosRequest.get(
        `/Product/get-product-by-id?id=${id}`
      );
      set({ productsByID: data?.data });
    } catch (error) {
      console.error(error);
    }
  },

  deleteImagesProducts: async (id) => {
    try {
      await axiosRequest.delete(
        `/Product/delete-image-from-product?imageId=${id}`
      );
      get().getProductByID();
    } catch (error) {
      console.error(error);
    }
  },

  editProduct: async (formData) => {
    try {
      await axiosRequest.put(
        `/Product/update-product?Id=${formData.Id}&BrandId=${formData.BrandId}&ColorId=${formData.ColorId}&ProductName=${formData.ProductName}&Description=${formData.Description}&Quantity=${formData.Quantity}&Code=${formData.Code}&Price=${formData.Price}&HasDiscount=${formData.HasDiscount}&DiscountPrice=${formData.DiscountPrice}&SubCategoryId=${formData.SubCategoryId}`
      );
      get().getProductByID();
    } catch (error) {
      console.error(error);
    }
  },

  searchProducts: async (search) => {
    try {
      const { data } = await axiosRequest.get(
        `/Product/get-products?ProductName=${search}`
      );
      console.log("search = ", data?.data?.products);
      set({ products: data?.data?.products });
    } catch (error) {
      console.error(error);
    }
  },
}));
