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
};

export const createWoocommerceOrder = async (data) => {
  try {
    const response = await api.post("orders", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const retrieveProductById = async (productId) => {
  try {
    const response = await api.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const retrieveOrderById = async (orderId) => {
  try {
    const response = await api.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCustomerOrders = async (customerId) => {
  try {
    const response = await api.get(`orders?customer=${customerId}`);
    return response.data;
  } catch (error) {
    return {
      message:
        "Error within getCustomerOrders function within woocCommerceApi.js: ",
      error: error,
    };
  }
};


export const getDownloadLinks = async (userId) => {
  const md5 = require("md5");
  console.log('getting links!')
  const response = await fetch(
    `${process.env.WOOCOMMERCE_API_URL}/wp-json/wc/v3/customers/${userId}/downloads`,
    {
      method: "GET",
      headers: new Headers({
        authorization: `Basic ${process.env.ADMIN_BASIC_AUTH_HEADER_KEY}`,
      }),
    }
  );
  const data = await response.json();

  const orders = [...new Set(data.map((item) => item.order_id))];

  const linkList = orders.map((order) => {
    const filtered = data.filter((item) => item.order_id === order);
    const links = filtered.map((item) => {
      return { name: item.file.name, url: item.file.file, hash: md5(item.file.file)  };
    });
    return { order_id: order, links: links };
  });

  return linkList;
};
