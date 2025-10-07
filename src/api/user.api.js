import { Axios } from "../constants/mainContent";

const userApi = "/user";

export const userLogin = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/userLogin`, payload);

   
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
};

export const userForgotPassword = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/forgetpassword`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userChangePassword = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/regeneratepassword`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userNewPassword = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/changePassword`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const userRegister = async (payload) => {
  try {
    const response = await Axios.post(`${origin}/auth/register`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIncomeHistory = async () => {
  try {
    const response = await Axios.get(
      `${userApi}/get-income-history`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const profileUpdate = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/addkyc`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async () => {
  try {
    const response = await Axios.get(`${userApi}/userDetails`);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getUserTree = async (id) => {
  try {
    const response = await Axios.get(`${userApi}/get-tree/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

// export const getOrdersFranchise = async () => {
//   try {
//     const response = await Axios.get(`${franchiseApi}/myOrders-franchise`);
//     return response?.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getOrdersFranchise = async () => {
  try {
    const response = await Axios.get(`${userApi}/myOrders-franchise`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllCategories = async () => {
  try {
    const response = await Axios.get(`/admin/categories`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByCategory = async (categoryId) => {
  try {
    const response = await Axios.get(
      `/franchise/fetch-products/${categoryId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getAllProducts = async () => {
  try {
    const response = await Axios.get(`${userApi}/products/all-products`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getSingleProductDetails = async (id) => {
  try {
    const response = await Axios.get(`${userApi}/products/productbyId/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addtoCart = async (payload) => {
  try {
    const response = await Axios.post(`${userApi}/products/addToCart`, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeToProducts = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/cart/remove`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCarts = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/cart/getCarts/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/cart/removeProduct`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/payment/orders`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await Axios.post(`${userApi}/payment/verify`, paymentData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const placeOrderWithEPin = async (paymentData) => {
    try {
      const response = await Axios.post(`${userApi}/payment/epin`, paymentData);
      return response;
    } catch (error) {
      return error.response;
    }
  };

export const getOrders = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/myOrders/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/address/add`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = async (userId) => {
  try {
    const response = await Axios.get(`${userApi}/addresses/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deteleAddress = async (addressId) => {
  try {
    const response = await Axios.delete(
      `${userApi}/address/delete/${addressId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (addressId, data) => {
  try {
    const response = await Axios.put(
      `${userApi}/address/update/${addressId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboradData = async () => {
  try {
    const response = await Axios.get(`${userApi}/dashboard`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = async () => {
  try {
    const response = await Axios.get(`/admin/get-news`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getDownlineMember = async () => {
  try {
    const response = await Axios.get(`${userApi}/get-my-downline`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getMyDownlineMember = async () => {
  try {
    const response = await Axios.get(`${userApi}/get-my-partners`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestWithdrawal = async (data) => {
  try {
    const response = await Axios.post(
      `${origin}/user/withdrawal-request`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestEpinBalance = async (data) => {
  try {
    const response = await Axios.post(`${userApi}/transaction`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getEpinBalance = async () => {
  try {
    const response = await Axios.get(`${userApi}/myTransaction`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export async function createDistributor(payload) {
  const response = await Axios.post(`${userApi}/userRegistration`, payload);
  return response?.data;
}

export async function enquiryForm(payload) {
  const response = await Axios.post(`${userApi}/contact-us`, payload);
  return response?.data;
}

export async function getNews(payload) {
  const response = await Axios.get(`${userApi}/get-news`, payload);
  return response?.data;
}

export async function requestEmailVerifyOtp(payload) {
  const response = await Axios.post(`${userApi}/register`, payload);
  return response?.data;
}

export async function requestResendOtp(payload) {
  const response = await Axios.post(`${userApi}/resend-otp`, payload);
  return response?.data;
}

export async function verifyOtpAndRegister(payload) {
  const response = await Axios.post(`${userApi}/register-otp-verify`, payload);
  return response?.data;
}


export async function addComplain(payload) {
  const response = await Axios.post(`${userApi}/grievance`, payload);
  return response?.data;
}


