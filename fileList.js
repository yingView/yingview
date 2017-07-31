const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const readFile = (path, filesMap, bool) => {
    files = fs.readdirSync(path);
    files.forEach((file) => {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesMap, bool);
        } else if (bool) {
            if (file.indexOf('.'))
            filesMap[file] = path + '/' + file;
        } else {
            if (file.indexOf('.'))
            filesMap[path.substring(path.lastIndexOf('/') + 1)] = path + '/';
        }
    });
}

const geFileMap = (path, bool) => {
    const filesMap = JSON.parse(JSON.stringify({}));
    readFile(path, filesMap, bool);
    return filesMap;
}

const path = './src/pages';

const htmlList = [];
const htmlFiles = geFileMap('./html', true);
const entry = geFileMap(path);
for (const html in htmlFiles) {
    htmlList.push(
        new HtmlWebpackPlugin({
            filename: html,
            template: htmlFiles[html], // Load a custom template 
            chunks: [html.substring(0, html.indexOf('.'))], // 允许添加的模块 js / css
            inject:'true',
            hasg:'true'
        })
    )
}
module.exports = {
    entry: entry,
    html: htmlList
};