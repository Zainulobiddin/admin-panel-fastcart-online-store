// import { axiosRequest } from "@/utils/axios";
import { saveToken } from "@/utils/other";
import axios from "axios";
import { create } from "zustand";

export const useAuthAdmin = create(() => ({
  postLogInAdmin: async (newAdmin) => {
    try {
      const { data } = await axios.post("http://37.27.29.18:8002/Account/login", newAdmin);
      saveToken(data?.data);
      console.log(data?.data);
      return data;
    } catch (error) {
      console.error(error);
      return error
    }
  },
}));
