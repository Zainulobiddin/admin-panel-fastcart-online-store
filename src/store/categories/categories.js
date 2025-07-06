import { axiosRequest, axiosStandart } from "@/utils/axios";
import { create } from "zustand";

export const useCategories = create((set, get) => ({
    categories: [],


    getCategories: async () => {
        try {
            const {data} = await axiosStandart.get(`/Category/get-categories`)            
            console.log(data)
            set({categories: data?.data})
        } catch (error) {
            console.error(error);
        }
    },

    addCategories: async (formData) => {
        try {
            await axiosRequest.post(`/Category/add-category`, formData)      
            get().getCategories()      
        } catch (error) {
            console.error(error);
        }
    },

    deleteCategories: async (id) => {
        try {
            await axiosRequest.delete(`/Category/delete-category?id=${id}`)            
            get().getCategories()
        } catch (error) {
            console.error(error);
        }
    },

    editCategories: async (formData) => {
        try {
            await axiosRequest.put(`/Category/update-category`, formData)            
            get().getCategories()
        } catch (error) {
            console.error(error);
        }
    }






}))