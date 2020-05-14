/*
 * @Description:
 * @Author: seven
 * @Date: 2020-05-14 15:47:31
 * @LastEditTime: 2020-05-14 17:44:46
 * @LastEditors: seven
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: "css",
    }),
    // addLessLoader({
    //     javascriptEnabled: true,
    //     modifyVars: { '@primary-color': '#1DA57A' }
    // }),
);