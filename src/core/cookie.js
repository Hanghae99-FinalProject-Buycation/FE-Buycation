import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookies = (id, value, option) => {
  return cookies.set(id, value, { ...option });
};

export const getCookies = (id) => {
  return cookies.get(id);
};

export const removeCookies = (id) => {
  return cookies.remove(id);
};

const cookieControler = () => {
  return null;
};

export default cookieControler;
