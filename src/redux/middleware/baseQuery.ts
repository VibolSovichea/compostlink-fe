import { API_URL } from "@/utils/env";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const getToken = () => {
  const cookieToken = Cookies.get("access_token");
  if (cookieToken) return cookieToken;
  return undefined;
};

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const token = getToken();

  const baseResult = await fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      if(token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // if (baseResult.meta?.response?.status === 401) {
  //   api.dispatch(logout());
  // }

  return baseResult;
}

export default baseQuery;
