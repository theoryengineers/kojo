
class Login {
  constructor (parent) {
    this.db = parent.db
    this.parent = parent
  }

  async getHash (email) {
    try {
      const user = await this.db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
      return user
    } catch (err) {
      console.log(err)
    }
  }

  async register (displayName, email, hash) {
    const trx = this.parent.createTransaction()
    try {
      await this.db.insert({hash, email})
        .into('login')
        .transacting(trx)

      const status = await this.db.insert({
        displayName,
        email,
        joined: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      })
        .into('users')
        .transacting(trx)
      trx.commit()
      return status
    } catch (err) {
      console.log('USER register', err)
      trx.rollback()
    }
  }

  get () {

  }

  update () {

  }

  delete () {

  }
}

module.exports = {
  Login
}
