import { Axios } from "../constants/mainContent";

const adminApi = "/admin";

export async function getEvents() {
  const response = await Axios.get(`${adminApi}/getEvents`);
  return response?.data;
}

export async function getAdminBankDetails() {
  const response = await Axios.get(`${adminApi}/get-bank-details`);
  return response?.data;
}


export async function fetchFranchis() {
  const response = await Axios.get(`${adminApi}/get-all-franchisee`);
  return response?.data;
}

