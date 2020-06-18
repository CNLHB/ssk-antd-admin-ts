interface TitleConfig {
    [title: string]: string[]
}
export const matchTitle: TitleConfig = {
    "/dashboard/log": ["Dashbaord", "登录日志"],
    "/dashboard/analysis": ["Dashbaord", "分析页"],
    "/dashboard/monitor": ["Dashbaord", "监控页"],
    "/user/list": ["用户管理", "用户列表"],
    "/dynamic/category": ["动态管理", "动态分类"],
    "/dynamic/detail": ["动态管理", "动态详情"],
    "/dynamic/chart": ["动态管理", "动态趋势"],
    "/topic/chart": ["话题管理", "话题趋势"],
    "/topic/list": ["话题管理", "话题列表"],


}