import { get, post, putParm } from 'config/api/axios'
import { IPageResult, ICommonResult } from 'config/api/IResult'
export interface IUser {
    address: string | null
    authorUrl: string
    birthday: string
    description: string
    email: string
    gender: number
    id: number
    isguanzhu: boolean
    occupation: string
    openId: string
    phoneNumber: string
    status: boolean
    userName: string
}
export interface IUserPage extends IPageResult {
    items: Array<IUser>
}

export const getUserList = async (page: number, size: number, value: string | null): Promise<IUserPage> => {
    let result = await get(`user/v2/list?page=${page}&rows=${size}&search=${value}`)
    if (result && result.items) {
        result.items = result.items.map((item: IUser) => {
            return {
                key: item.id,
                id: item.id,
                name: item.userName,
                phone: item.phoneNumber,
                email: item.email,
                url: item.authorUrl,
                gender: item.gender === 0 ? "男" : "女",
                status: item.status,
                action: [{ id: item.id, text: item.status === false ? "冻结" : "解冻" }, { id: item.id, text: "详情" }]
            }
        })
        return result
    } else {
        let tmp: IUserPage = {
            total: 0,
            totalPage: 0,
            page: 1,
            items: []
        }
        return tmp;
    }
}
export const userRegister = async (values: any): Promise<ICommonResult> => {
    let result = await post('user/register/v2', values)

    return result

}
export const freezeUser = async (obj: any): Promise<ICommonResult> => {
    let result = await putParm('user/freeze', obj)
    return result

}
