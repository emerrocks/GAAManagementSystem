import userService from '../services/userService'

const getHomepage = (req, res) => {
  return res.render('homepage.ejs')
}

const getNewUserPage = (req, res) => {
  return res.render('createUsers.ejs')
}

const createNewUser = async (req, res) => {
  const user = req.body
  const message = await userService.createNewUser(user)
  console.log('This is create new user', message)
  return res.redirect('/')
}

const getLoginPage = (req, res) => {
  return res.render("auth/login.ejs")
}

const getRegisterPage = (req, res) => {
  return res.render("auth/register.ejs")
}

//create new user for the database
const handleRegister = async (req, res) => {
  //validate input fields

  //create a new user
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      createdAt: Date.now()
    }
    const message = await userService.createNewUser(user)
    console.log(message)
    return res.redirect("/")
  }catch (e) {
    console.log(e)
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
