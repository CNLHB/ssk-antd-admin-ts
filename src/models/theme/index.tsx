export type ThemeColorType = "light" | "dark"

// 创建store类型接口
export interface ThemeInterface {
    theme: ThemeColorType;
    setTheme(theme: ThemeColorType):void
}
