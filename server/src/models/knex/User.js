
class User {
  constructor (parent) {
    this.db = parent.db
    this.parent = parent
  }

  async getAll () {
    try {
      const users = await this.db.select('*').from('users')
      return users
    } catch (err) {
      console.log('User Model get all', err)
    }
  }

  async getUserByEmail (email) {
    const user = await this.db.select('*').from('users').where('email', '=', email)
    return user
  }

  get () {

  }

  update () {

  }

  delete () {

  }
}

module.exports = {
  User
}
