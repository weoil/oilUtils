import { get, clone } from './modules/tool'
const obj = {}
const c = { a: 1, fn: function() {console.log('hello')} }
const arr = [c, c]
clone(obj, { a: c, b: arr })
c.a = 2
console.log(obj, get(obj, 'a.fn')===c.fn)
let i=get(obj, 'a.fn')
i()