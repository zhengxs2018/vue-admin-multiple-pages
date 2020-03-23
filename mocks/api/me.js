/* eslint-disable @typescript-eslint/no-var-requires */
const UserSchema = require('../schema/user')

module.exports = {
  'GET /me/settings': {
    code: 200,
    message: 'ok',
    data: UserSchema
  },
  'PUT /me/settings': {
    code: 200,
    message: 'ok',
    data: { error: 0 }
  }
}
