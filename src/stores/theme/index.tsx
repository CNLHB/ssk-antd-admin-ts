import { action, observable } from 'mobx'
import { ThemeInterface, ThemeColorType } from 'models/theme/index'
class ThemeStore implements ThemeInterface {
    @observable public theme: ThemeColorType = "light";
    @action.bound
    public setTheme(theme: ThemeColorType): void {
        console.log(theme);
        this.theme = theme;
    }
}
export default ThemeStore;