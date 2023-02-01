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

baseURLwToken.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = getCookies("id");
  config.headers["Authorization"] = `${token}`;
  return config;
});

// baseURLwToken.interceptors.response.use(
//   (res) => {
//     const { config, data } = res;
//     console.log("data확인", data);
//     switch (data.statusCode) {
//       case 404:
//         console.log(data.statusCode);
//         throw new Error("삭제된 공구입니다.");
//       default:
//         return res;
//     }
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );
