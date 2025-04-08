import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

const apiUrl = import.meta.env.VITE_API_URL_TESTING;

const apiSet = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Request Interceptor (properly typed)
apiSet.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
apiSet.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized error, redirecting to login...", error.response);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiSet;