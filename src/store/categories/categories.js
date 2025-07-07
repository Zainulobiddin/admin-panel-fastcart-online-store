import { axiosRequest, axiosStandart } from "@/utils/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useCategories = create((set, get) => ({
  categories: [],

  getCategories: async () => {
    try {
      const { data } = await axiosStandart.get(`/Category/get-categories`);
      console.log(data);
      set({ categories: data?.data });
      toast.info("product succesfull get");
    } catch (error) {
      console.error(error);
      toast(`${error}`);
    }
  },

  addCategories: async (formData) => {
    try {
      await axiosRequest.post(`/Category/add-category`, formData);
      get().getCategories();
      toast.info("product successfull added");
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  },

  deleteCategories: async (id) => {
    try {
      await axiosRequest.delete(`/Category/delete-category?id=${id}`);
      get().getCategories();
      toast.info("product successfull deleted");
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  },

  editCategories: async (formData) => {
    try {
      await axiosRequest.put(`/Category/update-category`, formData);
      get().getCategories();
      toast.info(`products successfull edited`);
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  },
}));
