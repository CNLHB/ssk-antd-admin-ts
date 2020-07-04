import { get, post } from 'config/api/axios'
interface IAuth {
    code: number
    data: { token: string, userInfo: any }
    message: string
    status: number
}
export interface ITopic {
    key: number,
    id: number,
    userpic: string,
    title: string,
    cName: string,
    createTime: string,
}
export interface ITopicTitle {
    key: number,
    id: number,
    cid: number
    description: string,
    title: string,
    titlePic: string,
    createTime: string,
}
export const getTopicList = async (id: number): Promise<ITopic[]> => {
    let result = await get('topic/list/' + id);
    if (Array.isArray(result)) {
        return result
    }
    return []
}
export const getTitle = async (id: number): Promise<ITopicTitle[]> => {
    let result = await get('topic/title/user/' + id);
    if (Array.isArray(result)) {
        return result
    }
    return []
}
export const authAPI = async (): Promise<IAuth> => {
    let result = await get('auth/verify');
    return result
}
export const loginAPI = async (data: any): Promise<IAuth> => {
    let result = await post('user/login', data);
    return result
}