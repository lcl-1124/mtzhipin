/*
    加载配置，实现按需打包
*/
const { override, fixBabelImports,addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports(
        'import',
        {
            libraryName: 'antd-mobile',
            style: 'css',
        }
    ),
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    })
);
