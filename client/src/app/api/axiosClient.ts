import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
})

export default api
