/*
 * @Description:
 * @Author: seven
 * @Date: 2020-06-07 12:48:57
 * @LastEditTime: 2020-07-05 02:29:43
 * @LastEditors: seven
 */
import axios from "axios";
import { message } from 'antd'
export let base = process.env.NODE_ENV === 'development' ? "http://192.168.31.164:8081/api/" : "http://ssk.xquery.cn/api/";
// let socketBaseUrl = process.env.NODE_ENV === 'development' ? "ws://192.168.31.164:8081/api/" : "ws://api.hfb.xquery.cn/api/";
axios.defaults.timeout = 10000;    //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = base;   //配置接口地址
// 请求前拦截
axios.interceptors.request.use(
    config => {
        let token;
        try {
            token = window.localStorage.getItem("token")
        } catch (e) {
        }
        config.headers = {
            ...config.headers,
            "Authorization": token
        }
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 返回后拦截
axios.interceptors.response.use(
    res => {
        return Promise.resolve(res.data);
    },
    err => {
        if (err.toString().indexOf("Network") !== -1) {
            return Promise.resolve(500);
        }
        if (err.response) {
            try {
                const errCode = err.response.status
                switch (errCode) {
                    case 400:
                        console.log('错误请求')
                        break
                    case 401:
                        // 权限处理 重新登录 清空token
                        const msg = err.response.data.message
                        if (msg === 'TOKEN已过期!') {
                            // message.error('身份过期，请重新登录')
                            // window.location.href = '/login'
                        }
                        return Promise.resolve(err.response.data);
                        break
                    case 403:
                        message.error('身份过期请重新登录', 3)
                        window.location.href = '/login'
                        break
                    case 404:
                        // message.error('请求错误,未找到该资源')
                        return Promise.resolve(err.response.data);
                        break
                    case 405:
                        console.log('请求方法未允许')
                        break
                    case 408:
                        console.log('请求超时')
                        break
                    case 500:
                        message.error('服务器端出错')
                        console.log('服务器端出错')
                        break
                    case 501:
                        console.log('网络未实现')
                        break
                    case 502:
                        console.log('网络错误')
                        break
                    case 503:
                        console.log('服务不可用')
                        break
                    case 504:
                        console.log('网络超时')
                        break
                    default:
                        message.error('未知错误')
                }
            } catch (e) {
                return Promise.resolve(500);
            }
            return Promise.resolve(err);
        } else {
            console.log('请求错误,未找到该资源')
            return Promise.resolve(404);

        }

    }
);

// @RequestBody请求
export const post = (url: string, params: object): any => {
    return axios({
        method: "post",
        url: url,
        data: params
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    });
};

// @RequsetParam请求
export const postParam = (url: string, params: object): any => {
    return axios({
        method: "post",
        url: url,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        return res
    }).catch(err => {
        return err
    });
};

export const get = <T>(url: string): any => {
    let result = axios({
        method: "get",
        url: url
    }).then(res => {
        return res
    }).catch(err => {
        return err
    });
    return result
};
export const put = (url: string, params: object): any => {
    return axios({
        method: "put",
        url: url,
        data: params
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    });
};
export const putParm = (url: string, params: object): any => {
    return axios({
        method: "put",
        url: url,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    });
};
export const multiple = function (requsetArray: any, callback: any) {
    axios.all(requsetArray).then(axios.spread(callback));
};

// Component.prototype.get = get;
// Component.prototype.postRequestBody = postRequestBody;
// Component.prototype.postRequestParam = postRequestParam;
// Component.prototype.multiple = multiple;
