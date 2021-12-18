class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      // 理论上在这里接受data对象、message为字符串
      // 但是如果不传data对象的时候，需要做兼容，将只传入的字符串赋值给message第二个参数
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}