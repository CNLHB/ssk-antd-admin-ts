import { get, putParm } from 'config/api/axios'
import { IPageResult, ICommonResult } from 'config/api/IResult'
import time from 'utils/time'


interface IDynamic {
    key: number,
    id: number,
    uName: string,
    like: number,
    email: string,
    content: string,
    cName: string,
    createTime: string,
    status: boolean,
    action: [{
        id: number,
        text: string
    }]
}
export interface ITopicPage extends IPageResult {
    items: Array<IDynamic>
}
export const getDynamicList = async (page: number, size: number, value: string | null, cid: any): Promise<ITopicPage> => {
    let result = await get(`topic/v2/page?page=${page}&rows=${size}&search=${value}&cid=${cid}`)
    if (result && result.items) {
        result.items = result.items.map((item: any) => {
            return {
                key: item.id,
                id: item.id,
                cName: item.cName,
                email: item.email,
                like: item.infoNum.likeNum,
                content: item.title,
                uName: item.username,
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
export const topicActiveList = async (obj: any): Promise<ICommonResult> => {
    let result = await putParm('topic/active/list', obj)
    return result

}
