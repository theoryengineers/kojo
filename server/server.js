const express = require('express')
const app = express()
const router = express.Router();
const parser = require('body-parser')
const port = 8080;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
})

// API router (v1)
app.use('/api/v1', router);

router.get('/', (req, res) => {
  res.sendStatus(200);
})


////////////////////////////
// LOGIN AND REGISTRATION //
////////////////////////////

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if(email && password) {
    res.sendStatus(200).send('200 - Login Success')
  } else {
    res.sendStatus(400).send('400 - Bad Login')
  }
})

router.post('/register', (req, res) => {
  const { displayName, email, password } = req.body;

  if(displayName && email && password) {
    res.sendStatus(200).send('200 - Register Success')
  } else {
    res.sendStatus(400).send('400 - Bad Registration')
  }
})


///////////////
// USERS API //
///////////////

const userString = '/users'

// GET all users
router.get(userString, (req, res) => {
  res.sendStatus(200)
})

// GET a specific user
router.get(userString + '/:id', (req, res) => {
  res.sendStatus(200)
})

// UPDATE a specific user
router.put(userString + '/:id', (req, res) => {

})

// DELETE a specific user
router.delete(userString + '/:id', (req, res) => {

})


///////////////
// BOARD API //
///////////////

const boardString = '/board';


app.listen(port)