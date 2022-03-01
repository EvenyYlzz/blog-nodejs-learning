// 标准输入输出
// 输出一点就输出一点，类似水桶一点点倒
// process.stdin.pipe(process.stdout)

// -------------------------------------------------------

// 请求什么就返回什么、利用水管的API
// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res)
//   }
// })

// server.listen(8000)

// -------------------------------------------------------

// 复制文件
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)

// 监听过程，能观察到如果文件够大其实是一点一点通过流、管道传输完成的
readStream.on('data', chunk => {
  console.log(chunk.toString())
})

// 监听结束回调
readStream.on('end', () => {
  console.log('copy done')
})