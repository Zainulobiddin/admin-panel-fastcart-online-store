import { axiosRequest, axiosStandart } from "@/utils/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useSubcategories = create((set, get) => ({
  subCategories: [],

  getSubCategories: async () => {
    try {
      const { data } = await axiosStandart.get(`/SubCategory/get-sub-category`);
      set({ subCategories: data?.data });
      toast.info('subcategories successfull get')
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },

  deleteSubcategories: async (id) => {
    try {
      await axiosRequest.delete(`/SubCategory/delete-sub-category?id=${id}`);
      get().getSubCategories();
      toast.info('subcategories successfull delete')
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },

  addSubCategories: async (categoryID, subCategoryName) => {
    try {
      await axiosRequest.post(
        `/SubCategory/add-sub-category?CategoryId=${categoryID}&SubCategoryName=${subCategoryName}`
      );
      get().getSubCategories();
      toast.info('subcategories successfull added')
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },

  editSubCategories: async (id, categoryID, nameSubCategory) => {
    try {
      await axiosRequest.put(
        `/SubCategory/update-sub-category?Id=${id}&CategoryId=${categoryID}&SubCategoryName=${nameSubCategory}`
      );
      get().getSubCategories();
      toast.info('subcategories successfull edited')
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },
}));
