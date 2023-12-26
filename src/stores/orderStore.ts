import { create } from "zustand";
import * as orderService from "../services/orderService";
type PaymentStatus = "success" | "pending" | "failed";
type ActivePageType = "checkout" | "payment" | "success";
type State = {
  orderDetails: any;
  total: number;
  subTotal: number;
  discount: number;
  deliveryFees: number;
  paymentMethods: string[];
  activeMethod: string;
  paymentStatus: PaymentStatus;
  activePage: ActivePageType;
  productLoading: boolean;
  appliedCoupon: string;
  couponError: string;
};

type Action = {
  getOrderDetails: () => void;
  setActiveMethod: (method: string) => void;
  setPaymentStatus: () => void;
  setActivePage: (page: ActivePageType) => void;
  setAppliedCoupon: (coupon: string) => void;
  resetData: () => void;
};
export const useOrder = create<State & Action>((set, get) => ({
  orderDetails: {},
  deliveryFees: 10,
  discount: 0,
  subTotal: 0,
  total: 0,
  paymentMethods: [],
  activeMethod: "",
  paymentStatus: "pending",
  activePage: "checkout",
  productLoading: false,
  appliedCoupon: "",
  couponError: "",
  resetData: () => {
    set({
      orderDetails: {},
      deliveryFees: 10,
      discount: 0,
      subTotal: 0,
      total: 0,
      paymentMethods: [],
      activeMethod: "",
      paymentStatus: "pending",
      activePage: "checkout",
      productLoading: false,
      appliedCoupon: "",
      couponError: "",
    });
  },
  setAppliedCoupon: (coupon: string) => {
    const FIXED_DISCOUNT = 50;
    if (coupon.toUpperCase() !== "APPLE") {
      set({ couponError: "Coupon code is not valid", discount: 0 });
      return;
    }
    const total = Number(
      (
        useOrder.getState().subTotal +
        useOrder.getState().deliveryFees -
        FIXED_DISCOUNT
      ).toFixed(2)
    );
    set({
      appliedCoupon: coupon,
      discount: 50,
      couponError: "",
      total: total > 0 ? total : 0,
    });
  },
  setActivePage: (page: ActivePageType) => {
    set({ activePage: page });
  },
  setPaymentStatus: () => {
    let status: PaymentStatus = "success";
    const rndInt = Math.floor(Math.random() * 3) + 1;
    if (rndInt === 1) {
      status = "success";
    } else if (rndInt === 2) {
      status = "pending";
    } else {
      status = "failed";
    }
    set({ paymentStatus: status });
  },
  setActiveMethod: (method: string) => {
    set({ activeMethod: method });
  },
  getOrderDetails: async () => {
    try {
      set({ productLoading: true });
      const { data } = await orderService.getOrderDetails();
      set({ orderDetails: data });
      set({
        paymentMethods: data.paymentMethods,
      });
      const subTotal = data.products
        .map((item: any) => item.price * item.quantity)
        .reduce((a: number, b: number) => a + b, 0);
      set({ subTotal: subTotal.toFixed(2) });
      set({
        total: Number(
          (
            subTotal +
            useOrder.getState().deliveryFees -
            useOrder.getState().discount
          ).toFixed(2)
        ),
      });
      set({ productLoading: false });
    } catch (error) {
      set({ orderDetails: {} });
    }
  },
}));
