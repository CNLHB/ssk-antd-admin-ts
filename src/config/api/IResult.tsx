export interface ICommonResult {
    code: number
    status: number
    message: string
}
export interface IPageResult {
    items?: Array<any>
    page: number
    total: number
    totalPage: number | null
}


