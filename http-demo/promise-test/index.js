const fs = require('fs')
const path = require('path')

// 获取files下的a.json的绝对路径
// const fullFileName = path.resolve(__dirname, 'files', 'a.json')
// fs.readFile(fullFileName, (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data.toString())
// })

// callback 方式获取一个文件的内容
function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    callback(
      JSON.parse(data.toString())
    )
  })
}

// 层层接收， callback-hell
getFileContent('a.json', aData => {
  console.log('a data:', aData)
  getFileContent(aData.next, bData => {
    console.log('b data:', bData)
    getFileContent(bData.next, cData => {
      console.log('c data:', cData)
    })
  })
})