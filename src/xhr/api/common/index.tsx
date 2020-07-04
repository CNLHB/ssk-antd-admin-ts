
import { get, post } from 'config/api/axios'
import { ICommonResult } from 'config/api/IResult'

interface ICategory {
    createTime: string
    id: number
    name: string
    status: boolean
}
export interface ICommon {
    text: number
    value: string
}
export interface ITopicTrend {
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
export const getCategoryList = async (): Promise<ICategory[]> => {
    let result = await get('category/list')
    return result
}
export const addCategory = async (values: any): Promise<ICommonResult> => {
    let result = await post('category', values)
    return result

}