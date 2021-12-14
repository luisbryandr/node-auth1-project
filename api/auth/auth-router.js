const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../users/users-model')

// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const { 
  checkPasswordLength, 
  checkUsernameExists, 
  checkUsernameFree
} = require('./auth-middleware')



router.post('/register', async (req, res, next ) => {
  try{
      //1 pull user and password from req.body  
      //2= create a hash off the password
      //3= we will store username and hash to the db
      const { username, password } = req.body
      const newUser = {
        password: bcrypt.hashSync(password, 8),
        username
      }
      console.log(newUser)
      const created = await User.add(newUser)
      console.log(created)
      res.status(201).json(created)

  }catch (err) {
    next(err)
  }
    
})

router.post('/login', async (req, res, next) => {
  try{
    next()
  } catch(err){
    next(err)
  }
})
router.get('/logout', async (req, res, next) => {
  try{
next()
  } catch(err){
    next(err)
  }
})
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
// Don't forget to add the router to the `exports` object so it can be required in other modules
 module.exports = router