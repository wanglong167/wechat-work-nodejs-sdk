import Axios, { AxiosResponse } from "axios";

const checkResponse = (res: AxiosResponse) => {
  if (res.data.errcode !== 0) {
    throw Error(`ERROR_FROM_WECHAT:${res.data.errcode}|${res.data.errmsg}`);
  }
};

const handleHttpError = (err: any, url: string, method: string, data?: any) => {
  throw Error(
    `HTTP_ERROR_FROM_WECHAT:${JSON.stringify({
      message: err.message,
      url,
      method,
      data
    })}`
  );
};

export const doGet = async (url: string, clear: boolean = true) => {
  try {
    const response = await Axios.get(url);
    checkResponse(response);
    const resData = response.data;
    if (clear) {
      delete resData.errcode;
      delete resData.errmsg;
    }
    return resData;
  } catch (err) {
    handleHttpError(err, url, "get");
  }
};

export const doPost = async (url: string, data: any) => {
  try {
    const response = await Axios.post(url, data);
    checkResponse(response);
    const resData = response.data;
    delete resData.errcode;
    delete resData.errmsg;
    return resData;
  } catch (err) {
    handleHttpError(err, url, "post", data);
  }
};