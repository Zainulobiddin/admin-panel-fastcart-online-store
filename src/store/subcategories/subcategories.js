import { axiosRequest, axiosStandart } from "@/utils/axios";
import { create } from "zustand";

export const useSubcategories = create((set, get) => ({
  subCategories: [],

  getSubCategories: async () => {
    try {
      const { data } = await axiosStandart.get(`/SubCategory/get-sub-category`);
      set({ subCategories: data?.data });
      console.log(data?.data);
    } catch (error) {
      console.error(error);
    }
  },

  deleteSubcategories: async (id) => {
    try {
      await axiosRequest.delete(`/SubCategory/delete-sub-category?id=${id}`);
      get().getSubCategories();
    } catch (error) {
      console.error(error);
    }
  },

//   addSubCategories: async () => {
//     try {
        
//     } catch (error) {
        
//     }
//   }



}));
