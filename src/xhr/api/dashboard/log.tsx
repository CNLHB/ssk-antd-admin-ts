import { get } from 'config/api/axios'
import { IPageResult } from 'config/api/IResult'
import time from 'utils/time'


interface ILog {
    index: number,
    id: number,
    account: number,
    name: string,
    adress: string,
    time: string,
}
export interface ILogPage extends IPageResult {
    items: Array<ILog>
}
export const getLoginLogList = async (page: number, size: number): Promise<ILogPage> => {
    let result = await get(`login/log?page=${page}&rows=${size}`)
    if (result && result.items) {
        result.items = result.items.map((item: any, index: number) => {
            return {
                id: item.id,
                index: index + 1,
                account: item.account,
                name: item.name,
                adress: item.adress ? item.adress : "未知地点",
                time: time.getAlltime(item.createTime)
            }
        })
        return result
    } else {
        let tmp: ILogPage = {
            total: 0,
            totalPage: 0,
            page: 1,
            items: []
        }
        return tmp;
    }
}

