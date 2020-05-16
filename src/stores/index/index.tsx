// store的初始化
// index.ts   src/stores/index.ts 代码如下：
import LoginStore from "../login/index";
import ThemeStore from "../theme/index";
export default {
    loginStore: new LoginStore(),
    themeStore: new ThemeStore()

};
