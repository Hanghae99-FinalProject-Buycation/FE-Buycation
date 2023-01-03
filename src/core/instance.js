import axios from "axios";

export const BACK_API = process.env.REACT_APP_BACKAPI;

//CROS 통신 -> headers에 origin을 보내줘야함
export const instance = axios.create({
  baseURL: BACK_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

//interceptors : axios에서 지원하는 기능. axios에서 요청을 보내는 것을 가로채서 추가하기
instance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = localStorage.getItem("id");
  config.headers["Authorization"] = `${token}`;
  return config;
});
