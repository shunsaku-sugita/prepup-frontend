import axios from "axios";
import { BASE_URL } from "../../config/apiConfig";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const getTokenSecurely = async () => {
  try {
    return await SecureStore.getItemAsync("authToken");
  } catch (error) {
    console.error("Error getting token securely:", error.message);
  }
};


// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
  async (config) => {
    // TODO : write token retrieval logic here - Khushal @ 18th Oct

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3MDEwZTllMmU5YWRlNWNiZmFjZWMiLCJpYXQiOjE3Mjg2Nzk5NjUsImV4cCI6MTgyODkzOTE2NX0.pmEoiBwmajEV7TWo3IkjpHrAp-hyPcYicXWJNQLWzt0";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error status codes
    if (error.response && error.response.status === 401) {
      // Unauthorized, maybe redirect to login or handle token refresh
    }
    return Promise.reject(error);
  }
);

// How to use for example
// await apiClient.post(
//   "/order/get",
//   {},
//   { query: searchQuery, limit, page: currentPage, status: orderStatus }
// );

export default apiClient;
