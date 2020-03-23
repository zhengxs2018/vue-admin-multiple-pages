/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  id: '@increment(10000)',
  avatar: '@image("200x100", "#894FC4", "#fff", "A")',
  username: '@lower(@last)',
  nickname: '@cname()',
  email: '@email()',
  slogan: '@ctitle()',
  email_verified: '@boolean()',
  verified: '@boolean()'
}
