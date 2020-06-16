import { action, computed, observable } from 'mobx'
import { CSSProperties } from 'react'
import { ThemeInterface, ThemeColorType } from 'stores/models/theme/index'
class ThemeStore implements ThemeInterface {
    @observable public theme: ThemeColorType = "light";
    @observable public affixHeader: boolean = false;
    @observable public affixMenu: boolean = false;
    @observable public isMd: boolean = false;
    @observable public collapsed: boolean = false;
    @observable public fixedHeader: CSSProperties = {
        position: 'fixed', zIndex: 1, top: 0, right: 0,
        width: "calc(100% - 258)",
    };
    @observable public contentTop: CSSProperties = { marginTop: 64 };
    @observable public fixedMenu: CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
    };
    @observable public layoutLeft: CSSProperties = {
        marginLeft: 258 //80
    };
    @computed
    public get getLayoutLeft(): CSSProperties {
        if (this.affixMenu) {

            return this.layoutLeft;

        }
        return {};
    }
    @computed
    public get getContentTop(): CSSProperties {
        if (this.affixHeader) {
            return this.contentTop;

        }
        return { marginTop: 0 };
    }
    @computed
    public get getFixedMenu(): CSSProperties {
        if (this.affixMenu) {
            return this.fixedMenu;
        }
        return {};
    }
    @computed
    public get getFixedHeader(): CSSProperties {
        if (this.affixHeader) {
            const layout = { ...this.fixedHeader }
            layout.width = `calc(100% - ${this.layoutLeft.marginLeft}px)`
            return layout;
        }
        return {};
    }
    @action.bound
    public setIsMd(md: boolean): void {
        if (md) {
            this.setLayoutLeft(0)
        } else {
            this.setLayoutLeft(258)
        }
        this.isMd = md;
    }
    @action.bound
    public setTheme(theme: ThemeColorType): void {
        console.log(theme);
        this.theme = theme;
    }
    @action.bound
    public setAffixHeader(affixHeader: boolean): void {
        this.affixHeader = affixHeader;
        console.log(this.collapsed);

        if (this.collapsed) {
            this.fixedHeader.width = `calc(100% - 82px)`
        }
    }
    @action.bound
    public setAffixMenu(affixMenu: boolean): void {
        this.affixMenu = affixMenu;
    }
    @action.bound
    public setMenuWidth(affixMenu: boolean): void {
        console.log(affixMenu);
    }
    @action.bound
    public setCollapsed(collapsed: boolean): void {
        this.collapsed = collapsed
    }
    @action.bound
    public setLayoutLeft(left: number): void {
        console.log(left);

        this.layoutLeft.marginLeft = left
    }

}
export default ThemeStore;