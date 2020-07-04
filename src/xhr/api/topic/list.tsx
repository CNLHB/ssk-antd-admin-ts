import { get, post, putParm } from 'config/api/axios'
import { IPageResult, ICommonResult } from 'config/api/IResult'
import time from 'utils/time'


interface ITopic {
    key: number,
    id: number,
    uName: string,
    title: string,
    total: number,
    url: string,
    desc: string,
    cName: string,
    createTime: string,
    status: boolean,
    action: [{
        id: number,
        text: string
    }]
}
export interface ITopicPage extends IPageResult {
    items: Array<ITopic>
}

export const getTopicTitleList = async (page: number, size: number, value: string | null, cid: any): Promise<ITopicPage> => {
    let result = await get(`topic/title/v2?page=${page}&rows=${size}&search=${value}`)
    if (result && result.items) {
        result.items = result.items.map((item: any) => {
            return {
                key: item.id,
                id: item.id,
                uName: item.uName,
                title: item.title,
                total: item.total,
                url: item.titlePic,
                desc: item.description,
                cName: item.cName === null ? "" : item.cName,
                createTime: time.gettime(item.createTime),
                status: item.display === true ? false : true,
                action: [{ id: item.id, text: item.display === true ? "冻结" : "解冻" }, { id: item.id, text: "详情" }]
            }
        })
        return result
    } else {
        let tmp: ITopicPage = {
            total: 0,
            totalPage: 0,
            page: 1,
            items: []
        }
        return tmp;
    }
}
export const freezeTopic = async (obj: any): Promise<ICommonResult> => {
    let result = await putParm('topic/title/freeze', obj)
    return result

}
export const addCategory = async (values: any): Promise<ICommonResult> => {
    let result = await post('category', values)
    return result

}