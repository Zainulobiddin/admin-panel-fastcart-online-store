import { axiosRequest, axiosStandart } from "@/utils/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useBrands = create((set, get) => ({
  brands: [],
  brandById: [],

  getBrands: async () => {
    try {
      const { data } = await axiosStandart.get(`/Brand/get-brands`);
      set({ brands: data.data });
      toast.info('brand successfull get')
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },

  addBrands: async (name) => {
    try {
      await axiosRequest.post(`/Brand/add-brand?BrandName=${name}`);
      get().getBrands();
      toast.info(`brand successfull added`)
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)

    }
  },

  deleteBrand: async (id) => {
    try {
      await axiosRequest.delete(`/Brand/delete-brand?id=${id}`);
      get().getBrands();
      toast.info(`brand successfull deleted`)
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },

  getBrandByID: async (id) => {
    try {
      const { data } = await axiosRequest.get(
        `/Brand/get-brand-by-id?id=${id}`
      );
      set({ brandById: data?.data });
    } catch (error) {
      console.error(error);
    }
  },

  editBrand: async (id, name) => {
    try {
      await axiosRequest.put(`/Brand/update-brand?Id=${id}&BrandName=${name}`);
      get().getBrands();
      toast.info(`brand successfull edited`)
    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    }
  },
}));
