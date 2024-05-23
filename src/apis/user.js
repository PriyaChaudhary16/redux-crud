import axios from "axios";
import { API_BASE_URL } from "../config";


export const fetchUsers = async (url, controller) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${url}`, {
      signal: controller.signal,
    });
    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    console.log("Error while fetching user list.", error);
    return {
      data: [],
      success: false,
    };
  }
};
