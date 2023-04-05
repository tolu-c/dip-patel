import axios, { AxiosInstance } from "axios";

type CustomHeaders = {
  "Content-Type": string;
  "Access-Control-Allow-Origin": string;
  Accept: string;
};

const AxiosApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_URL!,
});

AxiosApi.defaults.headers.common = {
  ...AxiosApi.defaults.headers.common,
  // eslint-disable-next-line
  ...(<CustomHeaders>{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  }),
};

export default AxiosApi;
