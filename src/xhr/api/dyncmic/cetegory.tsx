import { putParm } from 'config/api/axios'
import { ICommonResult } from 'config/api/IResult'
export const updateCategory = async (obj: any): Promise<ICommonResult> => {
    let result = await putParm('category', obj)
    return result
}
