import { instance } from "./instance";

//singin : 로그인
export const sign_in = async (post) => {
  try {
    const data = await instance.post(`members/login`, post);
    return data;
  } catch (error) {
    //alert(error.response.data.msg);
  }
};
