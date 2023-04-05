
import axios from "axios";
import serverConfig from "./config";
// 创建axios实例
const serviceAxios = axios.create({
  baseURL: serverConfig.baseURL,
  timeout: 3000,
});


// 请求拦截
serviceAxios.interceptors.request.use(
  (config) => {
    // 业务逻辑

    // 如果开启token认证
    if (serverConfig.useTokenAuthorization) {
      config.headers["token"] =  localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截
serviceAxios.interceptors.response.use(
  (res) => {
     return res
  }
)

export default serviceAxios;