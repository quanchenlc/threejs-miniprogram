const fs = require('fs')
const path = require('path')
const StringReplacePlugin = require("string-replace-webpack-plugin");
const {replaceStrArr}=require('./replaceStr');


function resolveThreeModule() {
  const threePath = require.resolve('three')
  const replaceArr=replaceStrArr;
  let code = fs.readFileSync(path.resolve(threePath), 'utf8');
  replaceArr.forEach(value => {
    if(code.indexOf(value[0])===-1){
      console.log(code.indexOf(value[0]),value[0]);
    }
    code=code.replace(value[0],value[1]);
  })
  return code
}

module.exports = {
  entry: path.join(__dirname, '../src/index'),
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist'),
    // path: path.join(__dirname, '../example/miniprogram_npm/threejs-miniprogram'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env",
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },
      {
        test: /\index.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /__INJECT_THREE__/ig,
              replacement: () => {
                return resolveThreeModule()
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
      // an instance of the plugin must be present
      new StringReplacePlugin()
  ],
  optimization:{
    minimize: true,
  }
}
