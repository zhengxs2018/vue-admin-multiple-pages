# 编写 mock 接口

**注意事项：**

1. 接口需要写在 `mocks` 目录
2. 文件的名称可以自定义，但是最好是一个模块一个文件
3. 文件新增或修改，延迟 1秒后会自动重启应用
4. mock 支持 [expressjs][expressjs] 中间件写法和 [mockjs][mockjs] 写法
   1. 如果使用函数那就是标准的 [expressjs][expressjs] 中间件
   2. 如果使用非函数就是 [mockjs][mockjs] 语法

## 编写规则

使用对象进行路径映射

 * 对象的 key 为 `{HTTP METHODS} path`，已空格分开
 * 值可以使用函数或 json 数据

```bash
{GET,POST,...} PATH: Function | jsonData
```

## 代码示例

**可以使用对象或字符串**

```javascript
module.exports = {
  // doGet('/user/info') => {"userId": 0, "nickname": "张三"}
  'GET /user/info': {
    userId: 0,
    nickname: '张三'
  },
  // doPost('/user/update') => "ok"
  'POST /user/update': 'ok'
}
```

**使用函数**

函数是一个标准的 [expressjs][expressjs] 中间件，可以使用 `nodejs` 和 `expressjs` 的全部 api 方法.

```javascript
module.exports = {
  // doGet('/common/server_time') => 1582856501915"
  'GET /common/server_time': function getServerTime(req, res) {
    res.send(Date.now())
  }
}
```

**使用 Mockjs 数据**
A
只有当 `value` 非函数才会调用 `Mockjs.mock` 方法处理，语法请参考 [mockjs][mockjs] 官网示例

```javascript
const { Random } = require('mockjs')

module.exports = {
  'GET /erp/staffs': {
    'items|10': [
      {
        realname: '@cname()',
        'sex|1': ['男', '女', '未知']
      }
    ],
    page: 1,
    pageSize: 10,
    total: '@integer(10,100)',
    flag() {
      return Random.boolean()
    }
  }
}
```


[expressjs]: http://expressjs.com/
[mockjs]: http://mockjs.com/
