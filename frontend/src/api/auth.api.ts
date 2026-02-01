import axios from "../lib/axios"

export const registerAPI = (data: {
  name: string
  email: string
  password: string
}) => axios.post("/auth/register", data)

export const loginAPI = (data: {
  email: string
  password: string
}) => axios.post("/auth/login", data)
