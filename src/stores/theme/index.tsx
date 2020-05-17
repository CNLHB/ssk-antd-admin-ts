import { action, computed, observable } from 'mobx'
import { CSSProperties } from 'react'
import { ThemeInterface, ThemeColorType } from 'models/theme/index'
class ThemeStore implements ThemeInterface {
    @observable public theme: ThemeColorType = "light";
    @observable public affixHeader: boolean = false;
    @observable public affixMenu: boolean = false;
    @observable public fixedHeader: CSSProperties = {
        position: 'fixed', zIndex: 1, top: 0, right: 0, width: "calc(100% - 256)",
    };
    @observable public contentTop: CSSProperties = { marginTop: 66 };
    @observable public fixedMenu: CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
    };
    @observable public layoutLeft: CSSProperties = {
        marginLeft: 256
    };//80
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
            console.log(this.affixHeader);
            const layout = { ...this.fixedHeader }
            layout.width = `calc(100% - ${this.layoutLeft.marginLeft}px)`
            console.log(layout);
            console.log({ ...this.fixedHeader });

            return layout;
        }
        return {};
    }
    @action.bound
    public setTheme(theme: ThemeColorType): void {
        console.log(theme);
        this.theme = theme;
    }
    @action.bound
    public setAffixHeader(affixHeader: boolean): void {
        this.affixHeader = affixHeader;
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
    public setLayoutLeft(left: number): void {
        console.log(left);

        this.layoutLeft = { marginLeft: left }
    }

}
export default ThemeStore;