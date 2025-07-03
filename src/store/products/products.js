import axios from "axios";
import { create } from "zustand";

export const useProducts = create((set) => ({
    products: [],

    getProducts: async () => {
        try {
            const  {data} = await axios.get(` http://37.27.29.18:8002/Product/get-products`)            
            console.log(data?.data)
            set({products: data?.data.products})
        } catch (error) {
            console.error(error);
        }
    }
}))