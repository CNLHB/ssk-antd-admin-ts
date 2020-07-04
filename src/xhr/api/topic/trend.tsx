import { get } from 'config/api/axios'

interface ICommon {
    text: number
    value: string
}
interface ITopicTrend {
    day: number
    monthList: ICommon[]
    total: number
    upWeek: number
    week: number
    weekList: ICommon[]
    year: number
    yearList: ICommon[]
    yesterday: number
    categoryTotal: number
}
export const getTopicTrend = async (): Promise<ITopicTrend> => {
    let result = await get('topic/title/trend')
    if (result && result.data) {
        result.data.monthList = result.data.monthList.map((item: any) => {
            return { text: item.current_day, value: item.total }
        })
        result.data.weekList = result.data.weekList.map((item: any, index: number) => {
            return { text: item.current_day, value: item.total }
        })
        let len = result.data.yearList.length > 12 ? result.data.yearList.length : 12
        result.data.yearList = result.data.yearList.splice(len - 12, 12).map((item: any) => {
            return { text: item.months, value: item.total }
        })
    }

    return result && result.data
}
