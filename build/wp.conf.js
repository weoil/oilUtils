const Merge = require('webpack-merge')
const Path = require('path')
function resolve(...dir) {
  return Path.resolve(__dirname, '..', ...dir)
}
module.exports = Merge(
  {},
  {
    mode:'development',
    entry: {
      app: resolve('lib/index.ts')
    },
    output:{
      path:resolve('dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader'
        }
      ]
    }
  }
)
