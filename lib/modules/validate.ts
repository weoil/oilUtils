interface ValidateImp {}
interface _PropertyDescriptor extends PropertyDescriptor {
  data?: any
  pass?: boolean
}
function passIsFalse(
  target: any,
  methodName: string,
  descriptor: _PropertyDescriptor
) {
  const oldVal = descriptor.value
  descriptor.value = function(...args: [any]) {
    if (!this.pass) {
      return this
    }
    return oldVal.apply(this, args)
  }
}
export default class Validate implements ValidateImp {
  data: any = ''
  pass: boolean = true
  message: string = ''
  result: any
  constructor(data: any) {
    this.data = data
  }
  static of(data: any) {
    return new Validate(data)
  }
  static Email(data: string) {
    const _v = new Validate(data)
    return _v.email().pass
  }
  public msg(msg: string) {
    if (!this.message && !this.pass) {
      this.message = msg
    }
    return this
  }
  public len(max: number): Validate
  public len(min: number, max: number): Validate
  /**
   *
   *
   * @param {number} min 最小范围
   * @param {number} [max] (可选)最大范围 0:无限制
   * @returns {Validate} this
   * @memberof Validate
   */
  @passIsFalse
  public len(min: number, max?: number): Validate {
    try {
      const data = this.data + ''
      if (!max && max !== 0) {
        max = min
        min = 0
      }
      if (!data.length) {
        throw new Error()
      }
      const len = data.length
      if (len < min) {
        throw new Error()
        // max为0时为无限制
      } else if (max !== 0 && len > max) {
        throw new Error()
      }
    } catch (err) {
      this.pass = false
    }
    return this
  }
  public range(max: number): Validate
  public range(min: number, max: number): Validate
  /**
   *
   *
   * @param {number} min 最小范围
   * @param {number} [max] (可选)最大范围 0:无限制
   * @returns {Validate}
   * @memberof Validate
   */
  @passIsFalse
  public range(min: number, max?: number): Validate {
    try {
      const data = this.data
      if (typeof data !== 'number') {
        throw new Error()
      }
      if (!max && max !== 0) {
        max = min
        if (data > max) {
          throw new Error()
        }
      } else if (max === 0 && data < min) {
        throw new Error()
      } else if (data < min || data > max) {
        throw new Error()
      }
    } catch (err) {
      this.pass = false
    }
    return this
  }
  @passIsFalse
  public email(): Validate {
    return this.regexp(
      /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    )
  }
  @passIsFalse
  public phone(): Validate {
    return this.regexp(/^1[356789]\d{9}$/)
  }
  @passIsFalse
  public regexp(regexp: RegExp) {
    try {
      if (typeof this.data === 'object') {
        throw new Error()
      }
      this.pass = regexp.test(this.data + '')
    } catch (err) {
      this.pass = false
    }
    return this
  }
  @passIsFalse
  public required(): Validate {
    if (!this.data) {
      this.pass = false
    }
    return this
  }
  @passIsFalse
  public equals(obj: any): Validate {
    if (obj !== this.data) {
      this.pass = false
    }
    return this
  }
  public async then(cb: Function) {
    if (this.pass) {
      let result = cb(this.result)
      if (result instanceof Promise) {
        result = await result
      }
      this.result = result
    }
  }
  public catch(cb: Function) {
    if (!this.pass) {
      cb(this.message)
    }
  }
}
