import axios from "axios";
import { BACK_API } from "./env";
import { getCookies } from "./cookie";

// 헤더 토큰 값 없이 사용하는 경우
export const baseURL = axios.create({
  baseURL: BACK_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// 헤더 토큰 값이 들어가야 하는 경우
export const baseURLwToken = axios.create({
  baseURL: BACK_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// baseURLwToken.interceptors.request.use((config) => {
//   if (config.headers === undefined) return;
//   const token = localStorage.getItem("id");
//   config.headers["Authorization"] = `${token}`;
//   return config;
// });

baseURLwToken.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = getCookies("id");
  config.headers["Authorization"] = `${token}`;
  return config;
});
