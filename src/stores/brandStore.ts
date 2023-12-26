import { create } from "zustand";
import * as brandService from "../services/brandService";
type Action = {
  getBrandDetails: () => void;
};
type State = {
  merchantName: string;
  merchantLogo: string;
  primaryColor: string;
  backgroundColor: string;
};
export const useBrand = create<State & Action>((set, get) => ({
  merchantName: "",
  merchantLogo: "",
  primaryColor: "",
  backgroundColor: "",
  getBrandDetails: async () => {
    try {
      const { data } = await brandService.getBrandDetails();
      set({
        merchantName: data.merchantName,
        merchantLogo: data.merchantLogo,
        primaryColor: data.theme["--primary"],
        backgroundColor: data.theme["--background"],
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
