// store的初始化
// index.ts   src/stores/index.ts 代码如下：
import ThemeStore from "../theme/index";
import BreadStore from "../breadcrumb/index";
import AdminStore from "../user/user";

export default {
    themeStore: new ThemeStore(),
    breadStore: new BreadStore(),
    adminStore: new AdminStore()

};
