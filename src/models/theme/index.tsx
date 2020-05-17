import React, { CSSProperties } from 'react'
export type ThemeColorType = "light" | "dark"

export interface FixedInterface {
    position: string
    zIndex: number
    width: string
}
export interface FixedMenuInterface {
    overflow?: string,
    height?: string,
    position?: string,
    left?: number,
}
// 创建store类型接口
export interface ThemeInterface {
    theme: ThemeColorType;
    affixHeader: boolean;
    affixMenu: boolean;
    fixedHeader: CSSProperties
    contentTop: CSSProperties
    fixedMenu: CSSProperties
    layoutLeft: CSSProperties
    getLayoutLeft: CSSProperties
    getFixedHeader: CSSProperties
    getFixedMenu: CSSProperties
    getContentTop: CSSProperties
    setTheme(theme: ThemeColorType): void
    setAffixHeader(affixHeader: boolean): void
    setMenuWidth(affixwidth: boolean): void
    setAffixMenu(affixMenu: boolean): void
    setLayoutLeft(left: number): void
}
  //       { padding: 0, position: 'fixed', zIndex: 1, width: '100%', marginLeft: 2 }
