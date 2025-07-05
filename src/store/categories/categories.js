import { axiosStandart } from "@/utils/axios";
import { create } from "zustand";

export const useCategories = create((set) => ({
    categories: [],


    getCategories: async () => {
        try {
            const {data} = await axiosStandart.get(`/Category/get-categories`)            
            console.log(data)
            set({categories: data?.data})
        } catch (error) {
            console.error(error);
        }
    }
}))