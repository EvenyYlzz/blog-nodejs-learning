const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '520yyl',
  port: '3306',
  database: 'myblog'
})

// 开始链接
con.connect()

// 执行 sql 语句
// const sql = 'select * from users;'
const sql = 'insert into blogs (title, content, createtime, author) values ("标题C", "内容C", 1640461649754, "zhangsan");'
con.query(sql, (err, res) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(res)
})

// 关闭连接
con.end()