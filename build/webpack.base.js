/**
 * webpack 基本配置
 * */

const glob = require('glob');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const entryAndPage = require('../config/entryAndPage');
const webpackPlugins = []; // webpack plugins 数组

/**
 * 生成 html 页面
 * */
entryAndPage.html.forEach((html) => {
  webpackPlugins.push(new HtmlPlugin(html));
});

const webpackConfig = {
  entry: entryAndPage.js,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../',
    filename: 'static/[name].js'
  },
  plugins: webpackPlugins
};

module.exports = webpackConfig;
