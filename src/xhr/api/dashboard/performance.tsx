import { get } from 'config/api/axios'


interface IUrl {
    key: number,
    total: number,
    url: string,
}

interface ILineChart {
    type: string
    year: string | number
    value: string
}
interface IOVerView {
    type: string
    time: string
}
export const getUrlAPI = async (): Promise<IUrl[]> => {
    let result = await get("monitor/url")
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

export const getOverViewAPI = async (selUrl: string, day: string, type: string): Promise<IOVerView[]> => {
    let result = await get(`monitor/per/oline/current?type=${type}&day=${day}&url=${selUrl}`)
    if (Array.isArray(result) && result.length === 1) {
        let { dns_time, ttfb_time,
            connect_time, parse_dom_time,
            response_time, time_to_interactive } = result[0]
        let tmp = [
            { type: 'DNS查询', time: dns_time },
            { type: 'TCP连接时间', time: connect_time },
            { type: '首字节到达时间', time: ttfb_time },
            { type: '响应的读取时间', time: response_time },
            // { type: 'DOM', time: dom_content_loaded_time },
            { type: 'DOM解析的时间', time: parse_dom_time },
            // { type: 'DOM完整的加载时间，', time: load_time },
            { type: '首次可交互时间', time: time_to_interactive },
        ]
        return tmp
    } else {
        return [];
    }
}
export const getLineChartAPI = async (selUrl: string, day: string, selDay: number): Promise<ILineChart[]> => {
    let result = undefined;
    if (selDay === 0) {
        result = await get(`monitor/per/oline/day?day=${day}&url=${selUrl}`)

    } else {
        result = await get(`monitor/per/oline/long?day=${selDay}&url=${selUrl}`)

    }
    let tmp: ILineChart[] = []
    if (Array.isArray(result) && selDay === 0) {
        let len = result.length
        for (let i = 0; i < 24; i++) {
            let year = (i >= 10 ? i : '0' + i)
            let obj: any = {
                dns_time: 0,
                connect_time: 0,
                ttfb_time: 0,
                response_time: 0,
                parse_dom_time: 0,
                time_to_interactive: 0
            }
            for (let j = 0; j < len; j++) {
                if (result[j].time.split(" ")[1] === (year + ":00:00")) {
                    obj = result[j]
                }
            }
            tmp.push({
                type: 'DNS查询', year: year, value: obj.dns_time,
            })
            tmp.push({
                type: 'TCP连接时间', year: year, value: obj.connect_time,
            })
            tmp.push({
                type: '首字节到达时间', year: year, value: obj.ttfb_time,
            })
            tmp.push({
                type: '响应的读取时间', year: year, value: obj.response_time,
            })
            tmp.push({
                type: 'DOM解析的时间', year: year, value: obj.parse_dom_time,
            })
            tmp.push({
                type: '首次可交互时间', year: year, value: obj.time_to_interactive,
            })
        }
        return tmp
    } else {
        let len = result.length
        for (let i = 0; i < len; i++) {
            let { dns_time, ttfb_time,
                connect_time, parse_dom_time,
                response_time, time_to_interactive, current_day } = result[i]
            tmp.push({
                type: 'DNS查询', year: current_day, value: dns_time,
            })
            tmp.push({
                type: 'TCP连接时间', year: current_day, value: connect_time,
            })
            tmp.push({
                type: '首字节到达时间', year: current_day, value: ttfb_time,
            })
            tmp.push({
                type: '响应的读取时间', year: current_day, value: response_time,
            })
            tmp.push({
                type: 'DOM解析的时间', year: current_day, value: parse_dom_time,
            })
            tmp.push({
                type: '首次可交互时间', year: current_day, value: time_to_interactive,
            })
        }
        return tmp

    }

}


