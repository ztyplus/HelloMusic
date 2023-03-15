import Helper from "./helper";

const baseURL = "https://api.ztyang.cn/api/";

// GET请求
export const GET = (url, params = {}, config = {}) => {
  config.headers = { ...config.headers };
  return Helper.fetch.get(
    Helper.is.empty(baseURL) ? url : baseURL + url,
    params,
    config
  );
};

// POST请求
export const POST = (url, params = {}, config = {}) => {
  config.headers = { ...{ token: INIS.token }, ...config.headers };
  return Helper.fetch.post(baseURL + url, params, config);
};
