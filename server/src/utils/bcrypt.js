const bcrypt = require('bcryptjs')
const saltRnds = 10

function comparePassword (password, hash) {
  return new Promise(resolve => {
    bcrypt.compare(password, hash, (error, same) => {
      if (error || !same) {
        resolve(false)
        return
      }

      resolve(true)
    })
  })
}

function hashPassword (password) {
  return new Promise((resolve, reject) => {
    // create salt for hash
    bcrypt.genSalt(saltRnds, (error, salt) => {
      if (error) {
        reject(error)
        return
      }

      // create hash
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          reject(error)
          return
        }

        // return hash
        resolve(hash)
      })
    })
  })
}

module.exports = {
  comparePassword,
  hashPassword
}
