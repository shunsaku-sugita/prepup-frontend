import axios from "axios";
import { BASE_URL } from "../../config/apiConfig";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    // TODO : write token retrieval logic here - Khushal @ 18th Oct

    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEwNjI4OWY4NTI4MzQ2NjI0ZWY0MjQiLCJpYXQiOjE3Mjg2Nzk5NjUsImV4cCI6MTgyODkzOTE2NX0.u7y9lQW5J86sZzxkESewp6tqKkMdxyZXnSZNUTvSzo0";

    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA5OTAxYjJjMWFlM2U4ZTY0MmJjYTYiLCJpYXQiOjE3Mjg2Nzk5NjUsImV4cCI6MTgyODkzOTE2NX0.zKa2jczPvt4ZIkWZmKPfZbS3FzAJb6HeAWXwNCLbpao';

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
