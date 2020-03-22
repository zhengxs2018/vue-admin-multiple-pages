module.exports = {
  'GET /user/info': {
    code: 200,
    message: 'ok',
    data: {
      nickname: '@cname()',
      age: ''
    }
  },
  'GET /user/menus': {
    code: 200,
    message: 'ok',
    data: [
      {
        title: '首页',
        path: '/'
      }
    ]
  }
}
