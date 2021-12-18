## 程序运行层次顺序
1. bin/www.js (createServer)
2. app.js (对请求的基本设定、获取path、query、处理路由、404兜底)
3. src/router (处理各个路由的基本逻辑)
 - 使用controller处理对应的数据库查询、组织处理正确的数据
 - 使用model处理返回的统一格式
