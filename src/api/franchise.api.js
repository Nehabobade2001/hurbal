import { Axios } from "../constants/mainContent";

const franchiseApi = "/franchise";

export const franchiseLogin = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/login`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFranchiseProfile = async () => {
  try {
    const response = await Axios.get(`${franchiseApi}/franchiseDetails`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const findUserDetails = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/fetchUser`,payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const findFranchiseDetails = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/get-franchisee-details`,payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const submitStockOrder = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/order-form`,payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getMyOrder = async () => {
  try {
    const response = await Axios.get(`${franchiseApi}/get-all-Orders`);
    return response.data;
  } catch (error) {
    console.log(error);

    return error.response?.data || { error: "An error occurred while fetching orders." };
  }
};


export const createDistributorSaleData = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/create-orders`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const createUserSaleData = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/create-user-order`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

export const getProcessingOrder = async () => {
  try {
    const response = await Axios.get(`${franchiseApi}/get-user-orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};




export const franchisePermission = async (payload) => {
  try {
    const response = await Axios.post(`${franchiseApi}/update-order-status`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};


export const getDeliveredOrder = async () => {
  try {
    const response = await Axios.get(`${franchiseApi}/get-delivered-orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};



export const getStock = async () => {
  try {
    const response = await Axios.get(`${franchiseApi}/get-stock`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};


export const getFranchiseeOrdersAll = async () => {
  try {
    const response = await Axios.get(`${franchiseApi}/all-franchisee-orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

