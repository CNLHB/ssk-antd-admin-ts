/*
 * @Description:
 * @Author: seven
 * @Date: 2020-05-14 15:47:31
 * @LastEditTime: 2020-05-14 19:29:18
 * @LastEditors: seven
 */
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = override(
    // antd按需加载，不需要每个页面都引入“antd/dist/antd.css”了
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true  //这里一定要写true，css和less都不行
    }),
    // 配置路径别名
    addWebpackAlias({
        "@": resolve("src")
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1890ff' },
    })
)
// @primary-color: #1890ff; // 全局主色
// @link-color: #1890ff; // 链接色
// @success-color: #52c41a; // 成功色
// @warning-color: #faad14; // 警告色
// @error-color: #f5222d; // 错误色
// @font-size - base: 14px; // 主字号
// @heading-color: rgba(0, 0, 0, 0.85); // 标题色
// @text-color: rgba(0, 0, 0, 0.65); // 主文本色
// @text-color - secondary: rgba(0, 0, 0, 0.45); // 次文本色
// @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
// @border-radius - base: 4px; // 组件/浮层圆角
// @border-color - base: #d9d9d9; // 边框色
// @box-shadow - base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影