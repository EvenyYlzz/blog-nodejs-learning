const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  // data是二进制类型，需要转换为字符串
  console.log('data', data.toString())
})

// ----------------------------------------------------------

// 写入文件
const content = '这是新写入的内容\n'
const opt = {
  flag: 'a', // 追加写入用a。覆盖写入用w
}

// 1.文件路径 2.写入内容 3.写入方式 4.回调函数
fs.writeFile(fileName, content, opt, (err) => {
  if (err) {
    console.error(err)
    return
  }
})

// ----------------------------------------------------------

// ？？？文件很大怎么办？？？

// ----------------------------------------------------------

// 判断文件是否存在，该API已废除
fs.exists(fileName, (exists => {
  console.log('exists', exists)
}))