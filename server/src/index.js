const express = require('express')
const app = express()
const parser = require('body-parser')
const cors = require('cors')
const { hashPassword, comparePassword } = require('./utils/bcrypt')
const knex = require('knex')
const { Knex } = require('./models/knex')
const { orm } = require('./middleware/orm')

const port = 8080

const asyncMiddleware = controller => (req, res, next) =>
  Promise.resolve(controller(req, res, next)).catch(next)

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database/bacon.db'
  },
  useNullAsDefault: true
})

app.use(cors())
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.use(orm(new Knex(db)))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

/// /////////////////////////
// LOGIN AND REGISTRATION //
/// /////////////////////////
async function loginController (req, res) {
  const { email, password } = req.body
  const { User, Login } = req.orm

  if (!email || !password) {
    return res.status(400).json('incorrect form submission')
  }

  const hashData = await Login.getHash(email)
  const isValid = await comparePassword(password, hashData[0].hash)

  if (!isValid) {
    res.status(400).json('wrong credentials')
  } else {
    const user = await User.getUserByEmail(email)
    if (user) {
      // res.json(user[0])
      res.status(200).json('Success')
    }
  }
}

async function registerController (req, res) {
  try {
    const { displayName, email, password } = req.body
    const { Login } = req.orm
    const hashData = await hashPassword(password)
    Login.register(displayName, email, hashData)
  } catch (err) {
    console.log(err)
  }
}

app.use('/api/v1/login', asyncMiddleware(loginController))
app.use('/api/v1/register', asyncMiddleware(registerController))

app.listen(port)
