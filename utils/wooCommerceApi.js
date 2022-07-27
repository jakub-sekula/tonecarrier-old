import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Order } from "./wooCommerceTypes";

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_API_URL,
  consumerKey: process.env.WOOCOMMERCE_KEY,
  consumerSecret: process.env.WOOCOMMERCE_SECRET,
  version: "wc/v3",
});


// fetch all products from WooCommerce //
export const fetchWooCommerceProducts = async (endpoint, params) => {
  try {
    const response = await api.get(endpoint, params);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const createWoocommerceOrder = async (data) => {
  try {
    const response = await api.post("orders", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const retrieveProductById = async (productId) => {
  try {
    const response = await api.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCustomerOrders = async (customerId) => {
  try {
    const response = await api.get(`orders?customer=${customerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}