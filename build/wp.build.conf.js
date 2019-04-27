const Merge = require('webpack-merge')
const Path = require('path')
const Conf = require('./wp.conf') 
function resolve(...dir) {
  return Path.resolve(__dirname, '..', ...dir)
}
module.exports = Merge(
  Conf,
  {
    mode:'production'
  }
)
