/**
 * 对象 key 代表文件夹
 * val {String} 为对应html页面title
 */
const objMod = {
  /*  项目aaa  */
  aaa: {
    index: 'aaa主页',
    bbb: 'aaa/bbb页',
    ccc: {
      ddd: {
        eee: 'aaa -> eee页'
      }
    }
  }
};
function make(objMod, prevSrc, prevFinal) {
  const final = prevFinal || { js: {}, html: [] };
  const src = prevSrc || '';
  Object.keys(objMod).forEach((key) => {
    let nowSrc = `${src}/${key}`;
    if (typeof objMod[key] === 'object') { // 下面还是路径
      make(objMod[key], nowSrc, final);
    } else { // String 代表html title
      nowSrc = nowSrc.substring(1);
      final.js[nowSrc] = `./src/modules/${nowSrc}.app.js`;
      final.html.push({
        filename: `${nowSrc}.html`,
        template: `./src/html/${nowSrc}.html`,
        chunks: [nowSrc, 'commons'],
        title: objMod[key]
      });
    }
  });
  return final;
}
/**
 * 生成对象 例子
 * {
 * js:{
 *    'aaa/index': './src/aaa/index.app.js',
 *    'aaa/pc/index': './src/aaa/pc/index.app.js',
 * },
 * html:[
  * {
  *   filename: 'aaa/index.html',
  *   template: './src/html/aaa/index.html',
  *   chunks: [Object],
  *   title: 'aaa主页'
  * },
  * {
  *   filename: 'aaa/pc/index.html',
  *   template: './src/html/aaa/pc/index.html',
  *   chunks: [Object],
  *   title: 'aaa/pc/主页'
  * }
  *]
 * }

 * */
module.exports = make(objMod);
