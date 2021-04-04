import axios, { AxiosStatic } from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API

export function useAxios(): AxiosStatic {
  return axios
}
