import { type } from 'os'

/**
 * 统计出现次数,为数组会深度遍历统计,为字符串使用正则进行匹配
 *
 * @export
 * @param {(any[] | string)} data
 * @param {*} obj
 * @returns {number}
 */
export function count(data: any[] | string, obj: any): number {
  if (Array.isArray(data)) {
    return data.reduce(($count, item: any) => {
      if (item === obj) {
        return $count + 1
      }
      if (Array.isArray(item)) {
        return $count + count(item, data)
      }
      return $count
    }, 0)
  }
  const match = data.match(new RegExp(obj, 'g'))
  return (match && match.length) || 0
}

export function equals(...args: any[]) {
  if (args.length < 2) {
    return true
  }
  let data = args[0]
  for (let i of args.slice(1)) {
    if (i !== data) {
      return false
    }
  }
  return true
}
/**
 * 获取对象的值 如果没有则为null
 *
 * @export
 * @param {*} obj
 * @param {string} keys ‘xxx.xxx.xxx’
 * @returns
 */
export function get(obj: any, keys: string) {
  const keyArr = keys.split('.')
  for (let key of keyArr) {
    if (!obj) {
      return null
    }
    obj = obj[key]
  }
  return obj
}

/**
 * 确认source 是否包含str (includes)
 *
 * @export
 * @param {string} source
 * @param {string} str
 * @returns
 */
export function includes(source: string | any[], str: string) {
  if (Array.isArray(source)) {
    for (let i of source) {
      if (i === str) {
        return true
      }
    }
    return false
  }
  let sourceArr = source.split('')
  let strArr = str.split('')
  let index = 0
  for (const i of sourceArr) {
    if (i === strArr[index]) {
      index++
    } else if (i === strArr[0]) {
      index = 1
    } else {
      index = 0
    }
    if (index === strArr.length) {
      return true
    }
  }
  return false
}
type objImp = { [key: string]: any }
export function clone(obj: objImp, ...sources: [objImp]): void {
  const caches = new Map()
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      function copyObject(data: objImp) {
        const val = {}
        clone(val, data)
        return val
      }
      function copyArray(arr: any[]): any[] {
        return arr.map(item => {
          return copy(item)
        })
      }
      function copyFunction(fn: Function) {
        const fun = function() {}
        Object.setPrototypeOf(fun, Object.getPrototypeOf(fn))
        fn.call(fun)
        return fun
      }
      function copy(data: any) {
        if (caches.has(data)) {
          return caches.get(data)
        }
        let val = data
        if (Array.isArray(data)) {
          val = copyArray(data)
        } else if (data instanceof Function) {
          val = copyFunction(data)
        } else if (data instanceof Date) {
          val = new Date(data)
        } else if (typeof data === 'object') {
          val = copyObject(data)
        }
        caches.set(data, val)
        return val
      }
      let val = source[key]
      obj[key] = copy(val)
    })
  })
  caches.clear()
}
