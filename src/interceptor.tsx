import axios from 'axios'

// Create a new Axios instance with your custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your base API URL
  timeout: 5000, // Set the timeout for requests (optional)
})

// Request Interceptor: Modify requests before they are sent
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom logic here, such as adding headers, authentication, etc.
    config.headers.Authorization = `Bearer ${process.env.YOUR_BEARER_TOKEN}`
    config.headers.Locale = process.env.YOUR_LOCALE
    return config
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error)
  }
)

// Response Interceptor: Modify responses before they are handled
axiosInstance.interceptors.response.use(
  (response) => {
    // You can add custom logic here to handle successful responses
    return response
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error)
  }
)

export default axiosInstance
