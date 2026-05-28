import axios from "axios"

export const brapi = axios.create({
  baseURL: "https://brapi.dev/api",
})