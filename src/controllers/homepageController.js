import userService from '../services/userService'
import { validationResult } from 'express-validator'

const getHomepage = (req, res) => {
  return res.render('homepage.ejs')
}

const getNewUserPage = (req, res) => {
  return res.render('createUsers.ejs')
}

const createNewUser = async (req, res) => {
  const user = req.body
  await userService.createNewUser(user)
  return res.redirect('/')
}

const getLoginPage = (req, res) => {
  return res.render('auth/login.ejs')
}

const getRegisterPage = (req, res) => {
  const form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }
  return res.render('auth/register.ejs', {
    errors: req.flash('errors'),
    form: form,
  })
}

//create new user for the database
const handleRegister = async (req, res) => {
  //keep the old input value
  const form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }

  //validate input fields
  //create an empty array to save validation errors
  const errorsArr = []
  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    const errors = Object.values(validationError.mapped())
    errors.forEach((item) => {
      errorsArr.push(item.msg)
    })
    req.flash('errors', errorsArr)
    return res.render('auth/register.ejs', {
      errors: req.flash('errors'),
      form: form,
    })
  }

  //create a new user
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      createdAt: Date.now(),
    }
    await userService.createNewUser(user)
    return res.redirect('/')
  } catch (err) {
    //show the error messages using Flash
    req.flash('errors', err)
    return res.render('auth/register.ejs', {
      errors: req.flash('errors'),
      form: form,
    })
  }
}

module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createNewUser: createNewUser,
  getRegisterPage: getRegisterPage,
  getLoginPage: getLoginPage,
  handleRegister: handleRegister,
}
