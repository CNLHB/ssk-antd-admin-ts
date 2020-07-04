import { get } from 'config/api/axios'
import { IPageResult } from 'config/api/IResult'
import time from 'utils/time'


interface IUrl {
    key: number,
    total: number,
    url: string,
}
interface IErrorCount {
    item: string,
    percent: number,
    count: number,
}
interface IErrorUrl {
    key: number
    time: string
    error_name: string
    url: string
    filename: string
    message: string
    adress: string
}
export const getUrlAPI = async (): Promise<IUrl[]> => {
    let result = await get("monitor/error/url")
    if (result && result.length > 0) {
        result = result.map((item: any) => {
            return {
                ...item,
                key: item.url
            }
        })
        return result
    } else {
        return [];
    }
}
export const getErrorCountListAPI = async (type: string, day: string, selUrl: string): Promise<IErrorCount[]> => {
    let result = await get(`monitor/error/count/list?type=${type}&day=${day}&url=${selUrl}`)
    if (result && result.length > 0) {
        let total = 0;
        total = result.reduce((initNum: number, item: any) => {
            return initNum + item.total
        }, total)
        let tmp = result.map((item: any) => {
            return { item: item.error_type, count: item.total, percent: Number((item.total / total).toFixed(2)) }
        })
        return tmp
    } else {
        return [];
    }
}
export const getgetErrorUrlListAPI = async (type: string, day: string, selUrl: string): Promise<IErrorUrl[]> => {
    let result = await get(`monitor/error/url/list?type=${type}&day=${day}&url=${selUrl}`)
    if (result && result.length > 0) {
        result = result.map((item: any) => {
            return {
                key: item.id,
                time: time.getAlltime(item.create_time),
                error_name: item.error_type,
                url: item.url,
                filename: item.filename,
                message: item.message ? item.message : (item.tag_name ? item.tag_name + "加载错误" : "无描述信息"),
                adress: item.user_adress ? item.user_adress : "位置不详"
            }
        })
        return result
    } else {
        return [];
    }
}
export const getLineChartAPI = async (type: string, day: string, selUrl: string, selDay: number): Promise<IErrorUrl[]> => {
    let result = undefined;
    if (selDay === 0) {
        result = await get(`monitor/error/online/day?type=${type}&day=${day}&url=${selUrl}`)

    } else {
        result = await get(`monitor/error/online/long?type=${type}&day=${selDay}&url=${selUrl}`)

    }
    let tmp: any = []
    if (Array.isArray(result) && selDay === 0) {
        let len = result.length
        for (let i = 0; i < 24; i++) {
            let year = (i >= 10 ? i + "" : '0' + i)
            let objJs: any = {
                total: 0,
                time: year,
                error_type: 'jsError',
            }
            let objRes: any = {
                total: 0,
                time: year,
                error_type: 'resourceError',
            }
            let objPro: any = {
                total: 0,
                time: year,
                error_type: 'promiseError',
            }
            for (let j = 0; j < len; j++) {
                if (result[j].time === year) {
                    switch (result[j].error_type) {
                        case "jsError":
                            objJs = result[j]
                            break
                        case "promiseError":
                            objPro = result[j]
                            break
                        case "resourceError":
                            objRes = result[j]
                            break
                    }

                }
            }
            tmp.push(objPro)
            tmp.push(objRes)
            tmp.push(objJs)
        }
        return tmp
    } else {
        // let len = type === "year" ? 12 : selDay
        // for (let i = 0; i < len; i++) {
        //     let time = result[i].time
        //     let objJs: any = {
        //         total: 0,
        //         time: time,
        //         error_type: 'jsError',
        //     }
        //     let objRes: any = {
        //         total: 0,
        //         time: time,
        //         error_type: 'resourceError',
        //     }
        //     let objPro: any = {
        //         total: 0,
        //         time: time,
        //         error_type: 'promiseError',
        //     }
        //     let len1 = result.length
        //     let year = ''
        //     for (let j = 0; j < len1; j++) {
        //         if (result[j].time === year) {
        //             switch (result[j].error_type) {
        //                 case "jsError":
        //                     console.log(result[j])
        //                     objJs = result[j]
        //                     break
        //                 case "promiseError":
        //                     objPro = result[j]
        //                     console.log(result[j])
        //                     break
        //                 case "resourceError":
        //                     objRes = result[j]
        //                     console.log(result[j])
        //                     break
        //             }

        //         }
        //     }
        //     tmp.push(objPro)
        //     tmp.push(objRes)
        //     tmp.push(objJs)
        // }
        result = result.map((item: any) => {
            let len = item.time.split("-").length
            let re = item.time.split("-")
            return {
                total: item.total,
                time: re[len - 1 > 0 ? len - 1 : len],
                error_type: item.error_type
            }
        })
        return result

    }
    
   
}