/*
 * @Description:
 * @Author: seven
 * @Date: 2020-05-14 15:47:31
 * @LastEditTime: 2020-05-14 15:48:01
 * @LastEditors: seven
 */
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);