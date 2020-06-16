import React, { CSSProperties } from 'react'
export type ThemeColorType = "light" | "dark"


// 创建store类型接口
export interface ThemeInterface {
    theme: ThemeColorType;
    affixHeader: boolean;
    affixMenu: boolean;
    isMd: boolean;
    collapsed:boolean;
    fixedHeader: CSSProperties
    contentTop: CSSProperties
    fixedMenu: CSSProperties
    layoutLeft: CSSProperties
    getLayoutLeft: CSSProperties
    getFixedHeader: CSSProperties
    getFixedMenu: CSSProperties
    getContentTop: CSSProperties
    setIsMd(md: boolean): void
    setCollapsed(collapsed:boolean):void
    setTheme(theme: ThemeColorType): void
    setAffixHeader(affixHeader: boolean): void
    setMenuWidth(affixwidth: boolean): void
    setAffixMenu(affixMenu: boolean): void
    setLayoutLeft(left: number): void
}
