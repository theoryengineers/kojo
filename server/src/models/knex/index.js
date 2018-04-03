const { User: UserModel } = require('./User')
const { Login: LoginModel } = require('./Login')

class Knex {
  constructor (knex) {
    this.db = knex
    this.User = new UserModel(this)
    this.Login = new LoginModel(this)
  }

  createTransaction () {
    return new Promise(resolve => this.db.transaction(resolve))
  }
}

module.exports = {
  Knex
}
